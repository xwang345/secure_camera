var express = require('express');
var router = express.Router();
var ioListener = require('../lib/ioListener');

router.socket = function(socket, io) {
    ioListener.initialize(socket, io);
    router.get('/', function(req, res, next) {
        res.render('index');
    });
}

module.exports = router;