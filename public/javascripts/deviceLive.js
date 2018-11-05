$(document).ready(function() {
    var canvas = document.getElementById('video-canvas');
    var url = 'ws://' + document.location.hostname;
    var player = new JSMpeg.Player(url, { canvas: canvas });

    console.log(url);
})