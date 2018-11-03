var socket = io();
var messageList = document.getElementById('deviceMesBox');

socket.on('reload images', function(entities) {
    entities.forEach(e => {
        var imgElement = `
            <div class="deviceMesBox__imgElement">
                <span class="deviceMesBox__imgTime">${e.time}</span>
                <img src=${e.imageUrl} alt="Snapshot" />
            </div>
        `;
        messageList.innerHTML += imgElement;
    })
})