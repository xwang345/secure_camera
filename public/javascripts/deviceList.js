$(document).ready(function() {
    var deviceMesBox = $('.deviceMesBox__container--close:first');
    var deviceMesBoxCloseBtn = $('.deviceMesBox__container--close .closeBtn:first');

    $('.deviceList__deviceBtn').each(function(index) {
        $(this).click(function() {
            toggleSideColumn(deviceMesBox, 'open');
            showMesCount('#deviceMesBox', '#deviceBtnMesCount');
        })
    })

    deviceMesBoxCloseBtn.click(function() {
        toggleSideColumn(deviceMesBox, 'close');
    })

    function toggleSideColumn(sideColumn, state) {
        if (state === 'open') {
            sideColumn.toggleClass('deviceMesBox__container--close')
                .toggleClass('deviceMesBox__container');
        } else if (state === 'close') {
            sideColumn.toggleClass('deviceMesBox__container')
                .toggleClass('deviceMesBox__container--close');
        }
    }

    function showMesCount(mesBoxId, mesCountId) {
        let mesBox = $(mesBoxId);
        let mesCount = $(mesCountId);

        if (mesBox.attr('width') > 0) {
            mesCount.css('opacity', 0);
        }


    }
});