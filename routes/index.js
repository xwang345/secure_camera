var express = require('express');
var router = express.Router();
var ioListener = require('../lib/ioListener');

router.socket = function(socket) {
    ioListener.initialize(socket);
    router.get('/', function(req, res, next) {
        res.render('index');
    });
}

module.exports = router;