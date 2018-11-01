const deviceBoxs = document.getElementsByClassName('devicesList__diviceBox');
const indexMainRight = document.getElementsByClassName('index__main__right')[0];

for (device of deviceBoxs) {
    device.onclick = function() {
        toggleSideColumn(indexMainRight, 'open');
    }
}

function toggleSideColumn(sideColumn, state) {
    if (state === 'open') {
        sideColumn.style.width = "400px";
    } else if (state === 'close') {
        sideColumn.style.width = "0px";
    }
}