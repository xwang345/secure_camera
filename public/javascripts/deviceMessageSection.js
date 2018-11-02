var socket = io();
var messageList = document.getElementById('deviceMessageList');

console.log('1234');

socket.on('load images', function(imgUrl) {
    var newImg = document.createElement('img');
    newImg.setAttribute('href', imgUrl);
    messageList.appendChild(newImg);
});