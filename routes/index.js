var express = require('express');
var myImages = require('../lib/my-images');
var modelDatastore = require('../lib/model-datastore');

router.setSocketIo = function(socket, io) {
    router.io = io;
    router.socket = socket;
}

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/upload', function(req, res, next) {
    res.render('uploadImg');
});


module.exports = router;