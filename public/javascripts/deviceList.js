$(document).ready(function() {
    var deviceMesBox = $('.deviceMesBox__container:first');
    $('.deviceList__deviceBtn').each(function(index) {
        $(this).click(function() {
            toggleSideColumn(deviceMesBox, 'open');
        })
    })

    function toggleSideColumn(sideColumn, state) {
        if (state === 'open') {
            sideColumn.style.width = "400px";
        } else if (state === 'close') {
            sideColumn.style.width = "0px";
        }
    }
});