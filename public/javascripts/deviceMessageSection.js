$(document).ready(function() {
    var socket = io();

    socket.on('reload images', function(entities) {
        var content = '';

        entities.forEach(e => {
            var check = false;
            $('.deviceMesBox__imgElement').each(function() {
                if ($(this).attr('src') === e.imageUrl) {
                    check = true;
                }
            })

            if (!check) {
                var imgElement = `
                <div class="deviceMesBox__imgElement">
                    <span class="deviceMesBox__imgTime">${e.time}</span>
                    <img src=${e.imageUrl} alt="Snapshot" />
                </div>
            `;

                content += imgElement;
            }
        });

        $("#deviceMesBox").html(content);
    })
});