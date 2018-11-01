const socketIo = require('socket.io');

const ImageIo = {};

ImageIo.io = null;

ImageIo.initialize = function(server) {
    this.io = socketIo(server);
    this.ioListener();
}

ImageIo.ioListener = function() {
    var that = this;
    this.io.on('connection', function(socket) {
        console.log('A client is connected...')

        that.addImage(socket);
        that.socket(socket);
    })
}

ImageIo.addImage = function(socket) {
    var that = this;
    socket.on('add image', function() {

    })
}



ImageIo.socket = function(socket) {
    return socket;
}

module.exports = ImageIo;