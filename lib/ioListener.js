const ioListener = {}

ioListener.socket = null

ioListener.initialize = function(socket) {
    this.socket = socket;
    loadImage(socket);
    addImage(socket);
}

function loadImage(socket) {
    socket.on('load image', function() {

    });
}

function addImage(socket) {
    socket.on('add image', function() {

    });
}


module.exports = ioListener;