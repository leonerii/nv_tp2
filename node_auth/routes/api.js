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
                    .redirect(301, 'http://localhost:3000')
                    console.log('redirect')
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
