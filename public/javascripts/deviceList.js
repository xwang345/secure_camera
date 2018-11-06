$(document).ready(function() {
    var deviceMesBox = $('.deviceMesBox__container:first');
    var deviceMesBoxCloseBtn = $('.deviceMesBox__container .closeBtn:first');
    var deviceMesBoxImgElement = $('.deviceMesBox__container .deviceMesBox_imgElement');

    $('.deviceList__deviceBtn').each(function(index) {
        $(this).click(function() {
            toggleSideColumn(deviceMesBox, deviceMesBoxCloseBtn, deviceMesBoxImgElement, 'open');
        })
    })

    deviceMesBoxCloseBtn.click(function() {
        toggleSideColumn(deviceMesBox, deviceMesBoxCloseBtn, deviceMesBoxImgElement, 'close');
    })

    function toggleSideColumn(sideColumn, closeBtn, imgEle, state) {
        if (state === 'open') {
            sideColumn.css('width', 400);
            sideColumn.css('padding', 5);
            closeBtn.css('font-size', '20px');
            imgEle.css('margin', '5px 10px');
        } else if (state === 'close') {
            sideColumn.css('width', 0);
            sideColumn.css('padding', 0);
            closeBtn.css('font-size', '0px');
            imgEle.css('margin', '0');
        }
    }
});