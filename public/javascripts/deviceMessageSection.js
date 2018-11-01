var socket = io();
var messageList = document.getElementById('deviceMessageList');

socket.on('receive image', function(imgUrl) {
    var newImg = document.createElement('img');
    newImg.setAttribute('href', imgUrl);
    messageList.appendChild(newImg);
});