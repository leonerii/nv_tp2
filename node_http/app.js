var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs')
var axios = require('axios')

var basedir = '/var/www'

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// default route
app.use((req, res) => {
    if (req.cookies.user && req.cookies.token){
        axios.post('http://auth.com/verify-access',{
            'user': req.cookies.user,
            'token': req.cookies.token,
            'resource': req.url
        }).then(response => {
            console.log(response)
            if (response.status == 200){
                let basepath = basedir + req.url

                fs.lstat(basepath, (err, stat) => {
                    if (err){
                        res.jsonp(err)
                    }

                    else if (stat.isDirectory()){
                        fs.readdir(basepath, (err, files) => {
                            res.render('index', {file_list: files})
                        })
                    }

                    else if (stat.isFile()){
                        res.download(basepath)
                    }
                })
            }
            else {
                console.log(response.status)
                res.send(403)
            }
        })
    }
    else {
        res.redirect('http://auth.com')
        //No servidor fazer a autenticacao com usuário e senha e setar os cookies e
        //redirecionar de volta para a app
    }
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
