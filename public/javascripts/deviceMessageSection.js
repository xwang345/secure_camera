var socket = io();
var messageList = document.getElementById('deviceMesBox');

socket.on('reload images', function(entities) {
    console.log(123);
    entities.forEach(e => {
        var imgElement = `
            <div class="deviceMesBox__imgElement">
                <span>${e.time}</span>
                <img src=${e.imageUrl} alt="Snapshot" />
            </div>
        `;
        messageList.innerHTML += imgElement;
    })
})