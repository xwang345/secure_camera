var fs = require('fs'),
    http = require('http'),
    WebSocket = require('ws');

var STREAM_SECRET = '123456',
    STREAM_PORT = 80,
    WEBSOCKET_PORT = 3000,
    RECORD_STREAM = false;

// Websocket Server
var socketServer = new WebSocket.Server({ port: WEBSOCKET_PORT, perMessageDeflate: false });
socketServer.connectionCount = 0;

socketServer.on('connection', function(socket, upgradeReq) {
    socketServer.connectionCount++;

    console.log(
        'New WebSocket Connection: ',
        (upgradeReq || socket.upgradeReq).socket.remoteAddress,
        (upgradeReq || socket.upgradeReq).headers['user-agent'],
        '(' + socketServer.connectionCount + ' total)'
    );

    socket.on('close', function(code, message) {
        socketServer.connectionCount--;
        console.log(
            'Disconnected WebSocket (' + socketServer.connectionCount + ' total)'
        );
    });
});

socketServer.broadcast = function(data) {
    socketServer.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

// HTTP Server to accept incomming MPEG-TS Stream from ffmpeg
var streamServer = http.createServer(function(request, response) {
    var params = request.url.substr(1).split('/');

    if (params[0] !== STREAM_SECRET) {
        console.log(
            'Failed Stream Connection: ' + request.socket.remoteAddress + ':' +
            request.socket.remotePort + ' - wrong secret.'
        );
        response.end();
    }

    response.connection.setTimeout(0);

    console.log(
        'Stream Connected: ' +
        request.socket.remoteAddress + ':' +
        request.socket.remotePort
    );

    request.on('data', function(data) {

        console.log(data);
        socketServer.broadcast(data);
        if (request.socket.recording) {
            request.socket.recording.write(data);
        }
    });

    request.on('end', function() {
        console.log('close');
        if (request.socket.recording) {
            request.socket.recording.close();
        }
    });

    // Record the stream to a local file?
    if (RECORD_STREAM) {
        var path = 'recordings/' + Date.now() + '.ts';
        request.socket.recording = fs.createWriteStream(path);
    }
}).listen(STREAM_PORT);

console.log('Listening for incomming MPEG-TS Stream on http://35.243.158.28:' + STREAM_PORT + '/<secret>');
console.log('Awaiting WebSocket connections on ws://35.243.158.28:' + WEBSOCKET_PORT + '/');

// ffmpeg \
// -f v4l2 \
// -framerate 24 -video_size 640x480 -i /dev/video0 \ 
// -f mpegts \ 
// -codec:v mpeg1video -s 640x480 -b:v 1000k -bf 0 \ 
// http://35.243.158.28:80/123456

// ffmpeg -f v4l2 -framerate 24 -video_size 640x480 -i /dev/video0 -f mpegts -f mpeg1video -b 800k -r 30 http://35.243.158.28:80/123456