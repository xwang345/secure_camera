var express = require('express');
var router = express.Router();


var router = express.Router();

router.setSocketIo = function(socket, io) {
    router.io = io;
    router.socket = socket;
}

router.get(['/dashboard', '/'], function(req, res, next) {
    res.render('dashboard');
});

router.get('/howto', function(req, res, next) {
    res.render('howto');
});

router.get('/aboutUs', function(req, res, next) {
    res.render('aboutUs');
});






module.exports = router;