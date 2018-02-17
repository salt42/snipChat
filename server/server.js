let express = require('express');
let app = express();
let ExpressPeerServer = require('peer').ExpressPeerServer;

app.get('/', function(req, res, next) { res.send('Hello world!'); });

let server = app.listen(9000);

let options = {
    debug: true
};

app.use('/turn', ExpressPeerServer(server, options));
server.on('connection', function(id) {
    console.log("connect: ")
    console.log(id)
});
server.on('disconnection', function(id) {
    console.log("disconnect: ")
    console.log(id)
});
// OR
//
// var server = require('http').createServer(app);
//
// app.use('/peerjs', ExpressPeerServer(server, options));
//
// server.listen(9000);