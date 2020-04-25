var express = require('express');
var router = express.Router();
var fs = require('fs')
var basedir = '/var/www/'

/* GET home page. */
router.get('/:id', function(req, res, next) {
    fs.readdir(basedir, (err, files) => {
        console.log(req.params.id)
        res.jsonp(files)
    })
});


module.exports = router;
