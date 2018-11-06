$(document).ready(function() {
    var socket = io();

    socket.on('reload images', function(entities) {
        loadImages(entities);
        if ($('#deviceMesBox').css('width') == '0px') {
            $('#deviceBtnMesCount').css('opacity', 1);
            let num = Number($('#deviceBtnMesCount .mesCount__number:first').text());
            $('#deviceBtnMesCount .mesCount__number:first').html(++num);
        }
    });

    socket.on('load images', function(entities) {
        loadImages(entities);
    });

    function loadImages(entities) {

        var content = '';

        entities.forEach(e => {
            var imgElement = `
                <div class="deviceMesBox__imgElement">
                    <span class="deviceMesBox__imgTime">
                      ${e.time.getFullYear()} - ${e.time.getMonth() + 1} - ${e.time.getDate()} ${e.time.geHours()}:${e.time.getMinutes()}:${e.time.getSeconds()}
                    </span>
                    <img src=${e.imageUrl} alt="Snapshot" />
                </div>
            `;

            content += imgElement;
        });

        $(".deviceMesBox__mesWindow:first").html(content);
    }

});