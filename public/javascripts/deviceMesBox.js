$(document).ready(function() {
    var socket = io();

    socket.on('reload images', function(entities) {
        loadImages(entities);
    });

    socket.on('load images', function(entities) {
        loadImages(entities);
    });

    function loadImages(entities) {

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

        $(".deviceMesBox__mesWindow:first").html(content);
    }

});