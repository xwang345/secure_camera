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
        console.log('新连接建立...')
        that.addImage(socket);
    })
}

ImageIo.addImage = function(socket) {
    var that = this;
    socket.on('add image', function() {
        console.log('HAHA')
    })
}

module.exports = ImageIo;