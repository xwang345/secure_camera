var express = require('express');
var router = express.Router();
var ioListener = require('../lib/ioListener');

router.socket = function(socket, io) {
    ioListener.initialize(socket, io);

    router.get('/', function(req, res, next) {
        res.render('index');
    });

    router.get('/upload', function(req, res, next) {
        res.render('uploadImg');
    });
}


module.exports = router;