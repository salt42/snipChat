let path = require('path');
let express = require('express');
let app = express();
let ExpressPeerServer = require('./peerServer/index').ExpressPeerServer;
let server = app.listen(process.env.PORT || 80);


app.use(express.static(path.join(__dirname + '/../src')));
app.use(express.json());
app.get('/', function(req, res, next) {
    // res.send('Hello world!');
    res.sendFile(path.join(__dirname + '/../src/chat.html'));
});

app.use('/turn', ExpressPeerServer(server, {}));

app.post('/login', function (req, res, next) {
    console.log(req.body);
    if (req.body.username && req.body.username === 'user' && req.body.pass && req.body.pass === 'pass') {
        req.session.authenticated = true;
        // res.redirect('/secure');
    } else {
        // req.flash('error', 'Username and password are incorrect');
        // res.redirect('/login');
    }
});

app.get('/logout', function (req, res, next) {
    delete req.session.authenticated;
    res.redirect('/');
});
server.on('connection', function(id) {
    // console.log("connect: ")
    // console.log(id[0])
});
server.on('disconnection', function(id) {
    // console.log("disconnect: ")
    // console.log(id)
});
