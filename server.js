
// CREATE A SIMPLE SERVER
var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));
console.log("My socket server is running");

// SETUP THE SOCKET AS RUNNING ON THE SERVER
var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection ' + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        
        // THIS WOULD USE THE TOP LEVEL IO.SOCKETS TO EMIT TO ALL INCLUDING ORIGINAL SENDER
        // io.sockets.emit('mouse', data);
        
        // console.log(data);
    };

}
