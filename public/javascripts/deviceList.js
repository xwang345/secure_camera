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
            console.log('open');
            console.log(sideColumn.classList)
            sideColumn.toggleClass('deviceMesBox__container--close')
                .toggleClass('deviceMesBox__container');
        } else if (state === 'close') {
            console.log('close');
            console.log(sideColumn.classList)
            sideColumn.toggleClass('deviceMesBox__container')
                .toggleClass('deviceMesBox__container--close');
        }
    }
});