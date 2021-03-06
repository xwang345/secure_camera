$(document).ready(function() {
    var deviceMesBox = $('.deviceMesBox__container:first');
    var deviceMesBoxCloseBtn = $('.deviceMesBox__container .closeBtn:first');

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
            sideColumn.css('width', 400);
            sideColumn.css('padding', 5);
        } else if (state === 'close') {
            sideColumn.css('width', 0);
            sideColumn.css('padding', 0);
        }
    }
});