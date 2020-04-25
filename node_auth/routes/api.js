var express = require('express');
var router = express.Router();
var Users = require('../controllers/user');
var TokenGenerator = require('uuid-token-generator');


/* GET users listing. */
router.get('/login', function(req, res, next) {
    Users.get(req.query.username).then(
        user => {
            if (req.query.password == user.password){
                let token = tokgen2 = new TokenGenerator(256, TokenGenerator.BASE62);
                res.cookie('token', token)
                res.cookie('user', req.query.username)
                
                res.redirect('http://httpserver.com/')
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
    Users.get(req.query.username).then(user => {
        if (req.cookies.token == user.token){   
            user.role.forEach(role => {
                role.resource.forEach(resource => {
                    let result = req.resource.match(resource)

                    if (result)
                        if (role.action.contains(req.action))
                            res.sendStatus(200).end()
                })
            })
        }
        else
            res.sendStatus(403).end()         
    }).catch(
        err => {
            res.jsonp(err)
        }
    )
})

module.exports = router
