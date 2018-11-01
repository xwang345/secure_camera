const ioListener = {}

ioListener.socket = null

ioListener.initialize = function(socket) {
    this.socket = socket;
}


module.exports = ioListener;