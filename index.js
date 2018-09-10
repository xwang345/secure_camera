const express = require('express');
const exec = require('child_process').exec;
const five = require('johnny-five');
const Raspi = require('raspi-io');
const request = require('request');
const fs = require('fs');

const app = express();
const board = new five.Board({
    io: new Raspi()
});

board.on("ready", function() {

    takePicture('123');

    app.listen('8080', () => {
        console.log('Device is running on port:8080');
    });
});


function takePicture(name) {
    exec("fswebcam /home/pi/Desktop/secure_camera/canera_imgs/" + name + ".jpg", (err, stdout, stderr) => {
        console.log('Taking Picture Successful!');
        postPicture(name);
    })

}

function postPicture(name) {
    var formData = {
        // Pass a simple key-value pair
        my_field: name,
        // Pass data via Buffers
        my_buffer: Buffer.from([1, 2, 3]),
        // Pass data via Streams
        my_file: fs.createReadStream(__dirname + '/canera_imgs/' + name + '.jpg'),
        // Pass multiple values /w an Array
    };

    request.post({ url: 'http://47.93.7.57:3000/uploadImg', formData: formData }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });
}