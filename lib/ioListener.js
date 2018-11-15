const ioListener = {};

ioListener.socket = null;

ioListener.initialize = function(socket, io) {
  this.socket = socket;
  this.io = io;
  loadImage(socket);
  addImage(socket);
};

function loadImage(socket) {
  socket.on("load image", function() {});
}

function addImage(socket) {
  socket.on("add image", function() {});
}

module.exports = ioListener;
