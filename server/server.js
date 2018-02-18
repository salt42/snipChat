let PORT = process.env.OPENSHIFT_NODEJS_PORT || 80;
let IP = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
let path = require('path');
let express = require('express');
let app = express();
let ExpressPeerServer = require('./peerServer/index').ExpressPeerServer;
let server = app.listen(PORT, IP, function () {
    console.log( "Listening on " + IP + ", port " + PORT )
});


app.use(express.static(path.join(__dirname + '/../src')));
app.use(express.json());
app.get('/', function(req, res, next) {
    // res.send('Hello world!');
    res.sendFile(path.join(__dirname + '/../src/chat.html'));
});

app.use('/turn', ExpressPeerServer(server, {}));

app.post('/register', function (req, res, next) {
    console.log(req.body);
    //@todo validate

});
app.post('/login', function (req, res, next) {
    console.log(req.body);
    if (req.body.username && req.body.username === 'user' && req.body.pass && req.body.pass === 'pass') {
        req.session.authenticated = true;
        res.json({
            code: 1,
            msg: "ok"
        });
    } else {
        // req.flash('error', 'Username and password are incorrect');
        // res.redirect('/login');
        res.json({
            code: 4,
            msg: "login incorrect"
        });
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
