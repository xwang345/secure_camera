$(document).ready(function() {
    var socket = io();

    socket.on('reload images', function(entities) {
        loadImages(entities);
        $('#deviceBtnMesCount').css('opacity', 1);
        console.log($('#deviceBtnMesCount .mesCount__number:first'));
        let num = Number($('#deviceBtnMesCount .mesCount__number').text());
        $('#deviceBtnMesCount .mesCount__number').text(num++);
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