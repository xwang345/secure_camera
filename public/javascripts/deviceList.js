$(document).ready(function() {
    var deviceMesBox = $('.deviceMesBox__container:first');
    var deviceMesBoxCloseBtn = $('.deviceMesBox__container .closeBtn:first');

    $('.deviceList__deviceBtn').each(function(index) {
        $(this).click(function() {
            toggleSideColumn(deviceMesBox, deviceMesBoxCloseBtn, 'open');
        })
    })

    deviceMesBoxCloseBtn.click(function() {
        toggleSideColumn(deviceMesBox, deviceMesBoxCloseBtn, 'close');
    })

    function toggleSideColumn(sideColumn, closeBtn, state) {
        if (state === 'open') {
            sideColumn.css('width', 400);
            sideColumn.css('padding', 5);
            closeBtn.css('font-size', '20px');
        } else if (state === 'close') {
            sideColumn.css('width', 0);
            sideColumn.css('padding', 0);
            closeBtn.css('font-size', '0px');
        }
    }
});