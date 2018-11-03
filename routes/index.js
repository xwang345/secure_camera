var express = require('express');
var router = express.Router();
var ioListener = require('../lib/ioListener');

var router = express.Router();

router.setSocketIo = function(socket, io) {
    router.io = io;
    router.socket = socket;
}

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/test', function(req, res, next) {
    res.json({ 'message': 'hello' });
});



module.exports = router;