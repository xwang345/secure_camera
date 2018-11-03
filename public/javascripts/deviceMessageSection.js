var socket = io();
var messageList = document.getElementById('deviceMesBox');

socket.on('reload images', function(entities) {
    console.log(123);
    entities.forEach(e => {
        let imgElement = document.createElement('img')
        imgElement.setAttribute('src', e.imageUrl);
        imgElement.classList.add('deviceMessage__image')
        messageList.appendChild(imgElement);
    })
})