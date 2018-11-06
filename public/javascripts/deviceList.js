$(document).ready(function() {
    var deviceMesBox = $('.deviceMesBox__container:first');


    $('.deviceList__deviceBtn').each(function(index) {
        $(this).click(function() {
            toggleSideColumn(deviceMesBox, 'open');
        })
    })

    deviceMesBoxCloseBtn.click(function() {
        toggleSideColumn(deviceMesBox, 'close');
    })

    function toggleSideColumn(sideColumn, state) {
        if (state === 'open') {
            sideColumn.removeClass('deviceMesBox__container--close');
            sideColumn.addClass('deviceMesBox__container');
        } else if (state === 'close') {
            sideColumn.removeClass('deviceMesBox__container');
            sideColumn.addClass('deviceMesBox__container--close');
        }
    }
});