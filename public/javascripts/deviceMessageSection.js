$(document).ready(function() {
    var socket = io();

    socket.on('reload images', function(entities) {
        console.log(123);
        var content = '';

        entities.forEach(e => {
            var imgElement = `
                <div class="deviceMesBox__imgElement">
                    <span class="deviceMesBox__imgTime">${e.time}</span>
                    <img src=${e.imageUrl} alt="Snapshot" />
                </div>
            `;

            content += imgElement;
        });

        $("#deviceMesBox").html(content);
    });
});