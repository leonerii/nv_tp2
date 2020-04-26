var express = require('express');
var router = express.Router();
var Users = require('../controllers/user');
var TokenGenerator = require('uuid-token-generator');


/* GET users listing. */
router.post('/login', function(req, res, next) {
    Users.get(req.body.username).then(
        user => {
            if (req.body.password == user.password){
                let token = new TokenGenerator(256, TokenGenerator.BASE62);

                Users.update_token(req.body.username, token.baseEncoding)
                .then(() => {
                    res.cookie('token', token.baseEncoding, {expire: new Date() + 300000})
                    .cookie('user', req.body.username)
                    .redirect(301, 'http://localhost:3001')
                })
                .catch(err => {
                    console.log(err)
                    res.jsonp(err)
                })
            }
            else {
                res.sendStatus(403).end()
            }
        }
    ).catch(
        err => {
            res.jsonp(err)
        }
    )
});

router.post('/verify-access', (req, res) => {
    Users.get(req.body.username).then(user => {
        
        if (req.body.token == user.token){ 
            let flag = true

            user.roles.forEach(role => {
                role.resource.forEach(resource => {
                    let result = req.body.resource.match(resource)
                    console.log('regex result: ' + result)
                    console.log('role resource: ' + resource)
                    console.log('url: ' + req.body.resource)

                    if (result)
                        if (role.action.includes(req.body.action)){
                            res.jsonp({'status': 200})
                            flag = false
                        }
                })
            })
            
            if (flag)
                res.jsonp({'status': 403})
        }
        else{
            console.log('token não bate')
            res.jsonp({'status': 403})
        }         
    }).catch(
        err => {
            console.log(err)
            res.jsonp(err)
        }
    )
})

module.exports = router
