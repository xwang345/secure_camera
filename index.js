var exec = require('child_process').exec;
var five = require('johnny-five');
var Raspi = require('raspi-io');
var board = new five.Board({
    io: new Raspi()
});

board.on("ready", function() {
    var num = 0;
    var takeP = setInterval(function() {
        takePicture(num);
        num++;
    }, 500);

    setTimeout(function() {
        clearInterval(takeP);
    }, 10000);
});

function takePicture(name) {
    exec("fswebcam " + name + ".jpg", (err, stdout, stderr) => {
        console.log('Success!');
    })
}