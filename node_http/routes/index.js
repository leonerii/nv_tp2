var express = require('express');
var router = express.Router();
var fs = require('fs')
var basedir = '/var/www/'

/* GET home page. */
router.get('/favicon.ico', function(req, res, next) {
    res.download(basedir + 'favicon.ico')
});


module.exports = router;
