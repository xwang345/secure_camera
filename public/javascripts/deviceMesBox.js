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

            var eTime = new Date(e.time);

            // var imgTimeStr = eTime.getFullYear() + '-' + (eTime.getMonth() + 1) + '-' + eTime.getDate() + ' ' +
            //     eTime.getHours() + ':' + eTime.getMinutes() + ':' + eTime.getSeconds();

            var imgElement = `
                <div class="deviceMesBox__imgElement">
                    <span class="deviceMesBox__imgTime">
                      ${eTime.toLocaleString()}
                    </span>
                    <img src=${e.imageUrl} alt="Snapshot" />
                </div>
            `;

            content += imgElement;
        });

        $(".deviceMesBox__mesWindow:first").html(content);

        ImageEventListener('.deviceMesBox__imgElement', '#imgShowBoxId', '#imgShowBoxId .closeBtn:first');
    }

    function ImageEventListener(imgEleClass, imgShowId, btnClass) {
        $(imgEleClass).each(function(index) {
            $(this).click(function() {
                $(imgShowId).toggleClass('imgShowBox--close').toggleClass('imgShowBox');
                $(imgShowId).children('img:first').attr('src', this.children('img:first').attr('src'));
            })
        })

        $(btnClass).click(function() {
            $(imgShowId).toggleClass('imgShowBox--close').toggleClass('imgShowBox');
        })
    }
});