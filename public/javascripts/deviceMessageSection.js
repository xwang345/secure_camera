var socket = io();
var messageList = document.getElementById('deviceMessageList');

socket.on('reload images', function(entities) {
    entities.forEach(e => {
        let imgElement = document.createElement('img')
        imgElement.setAttribute('href', e.imageUrl);
        messageList.appendChild(imgElement);
    })
})