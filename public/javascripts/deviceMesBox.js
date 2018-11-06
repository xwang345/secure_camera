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

            console.log(e.time, typeof Date(e.time))

            var imgElement = `
                <div class="deviceMesBox__imgElement">
                    <span class="deviceMesBox__imgTime">
                      ${e.time}
                    </span>
                    <img src=${e.imageUrl} alt="Snapshot" />
                </div>
            `;

            content += imgElement;
        });

        $(".deviceMesBox__mesWindow:first").html(content);
    }

});