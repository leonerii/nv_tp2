var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs')
var axios = require('axios')

var basedir = '/var/www'
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// default route
app.use((req, res) => {
    if (req.cookies.user && req.cookies.token){
        let basepath = basedir + req.url

        console.log('URL: ' + req.url)
        console.log('BASEPATH: ' + basepath)
        
        fs.lstat(basepath, (err, stat) => {
            if (err){
                res.jsonp(err)
            }

            let action = stat.isFile() ? 'get' : 'list';

            axios.post('https://virtualizacao/auth/api/verify-access',{
                'username': req.cookies.user,
                'token': req.cookies.token,
                'resource': req.url,
                'action': action
            }).then(response => {
                if (response.data.status == 200){

                    if (action == 'list'){
                        if (req.url[req.url.length - 1] != '/')
                            req.url += '/'

                        fs.readdir(basepath, (err, files) => {
                            res.render('index', {file_list: files, path: req.url})
                        })
                    }

                    else if (action == 'get'){
                        res.download(basepath)
                    }
                }
                else 
                    res.sendStatus(403)
            }).catch(err => {
                console.log(err)
                res.jsonp(err)
            })
        })  
    }
    else 
        res.redirect('https://www.virtualizacao.com/auth')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
