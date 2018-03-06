var port = process.env.PORT || 80,
    ip   = process.env.IP || '0.0.0.0',
    dataPath = process.env.OPENSHIFT_DATA_DIR || __dirname + '/../';
    // mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    // mongoURLLabel = "";

// let IP = (process.env.OPENSHIFT_BUILD_NAME) ? "0.0.0.0"|| 'localhost';

let path = require('path');
let Datastore       = require('nedb');
let express         = require('express');
let bodyParser      = require('body-parser');
// let cookieParser    = require('cookie-parser');
let session         = require('express-session');


// init database
let db = new Datastore({ filename: path.join(dataPath + '/data.db') });
db.loadDatabase(function (err) {
    // Now commands will be executed
    db.ensureIndex({ fieldName: 'username', unique: true }, function (err) {});
});

//init express
let app = express();
let ExpressPeerServer = require('./peerServer/index').ExpressPeerServer;
let server = app.listen(port, function() {
    console.log("# Server started at port " + port);
});


let friendRequests = [];
let friendRequestsHash = [];
global.UserManager = {
    find(what, projection = {}) {
        return new Promise((resolve, reject) => {
            db.find(what, projection, (err, docs) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(docs);
            });
        });
    },
    getUser(name) {
        return new Promise((resolve, reject) => {
            db.find({username: name}, (err, docs) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (docs.length < 1) {
                    resolve(null);
                } else {
                    resolve(docs[0]);
                }
            });
        });
    },
    // update(name, changes) {
    //     db.update({ username: name }, { $set: changes }, { multi: false }, function (err, numReplaced) {
    //
    //     });
    // },
    add2UserQueue(username, item) {
        db.update({ username: username }, { $addToSet: { queue: item } }, { multi: false }, function (err, numReplaced) {});
    },
    addFriend(user, friendName) {
        db.update({ username: user.username }, { $addToSet: { friends: friendName } }, { multi: false }, function (err, numReplaced) {});
    },
    onConnect(socket) {
        if (!socket.session.hasOwnProperty("authenticated")) return;
        let userState = {
            name: socket.session.user.username,
            icon: socket.session.user.icon,
            color: socket.session.user.color,
            online: true,
            peerID: socket.session.user.peerID,
        };
        //say friends i'm online
        let friends = socket.session.user.friends;
        for (let i = 0; i < server.wss.clients.length; i++) {
            let client = server.wss.clients[i];
            if (!client.session.authenticated) continue;
            if (friends.indexOf(client.session.user.username) > -1 ) {
                client.send(JSON.stringify({
                    type: "FRIEND_STATE_CHANGE",
                    payload: userState
                }));
                break;
            }
        }
        UserManager.friendsUpdate(socket);
    },
    onDisconnect(socket) {
        if (!socket.session.hasOwnProperty("authenticated")) return;
        let user = socket.session.user;
        let userState = {
            name: user.username,
            icon: user.icon,
            color: user.color,
            online: false,
            peerID: "",
        };
        //say friends i'm offline
        let friends = user.friends;
        for (let i = 0; i < server.wss.clients.length; i++) {
            let client = server.wss.clients[i];
            if (!client.session.authenticated) continue;
            if (friends.indexOf(client.session.user.username) > -1 ) {
                client.send(JSON.stringify({
                    type: "FRIEND_STATE_CHANGE",
                    payload: userState
                }));
                break;
            }
        }
    },
    friendsUpdate(socket) {
        let result = [];
        let user = socket.session.user;
        let proms = [];

        console.log("update friends of %s", user.username);
        console.log(user.friends);
        for (let friendName of user.friends) {
            //check if friend is online
            let friend = {
                name: friendName,
                icon: "",
                color: "",
                online: false,
                peerID: "",
            };

            for (let i = 0; i < server.wss.clients.length; i++) {
                let client = server.wss.clients[i];
                if (!client.session.authenticated) continue;
                if (client.session.user.username === friendName) {
                    friend.icon = client.session.user.icon;
                    friend.color = client.session.user.color;
                    friend.peerID = client.session.user.peerID;
                    friend.online = true;
                    break;
                }
            }
            result.push(friend);
        }
        //load not online user
        for (let i = 0; i < result.length; i++) {
            if (!result[i].online) {
                //load from db
                proms.push(UserManager.find({ username: result[i].name }).then(function (docs) {
                    if (docs.length > 0) {
                        result[i].icon = docs[0].icon;
                        result[i].color = docs[0].color;
                    }
                }));
            }
        }
        Promise.all(proms).then(() => {
            //send friends to user
            socket.send(JSON.stringify({
                type: "FRIENDS_UPDATE",
                payload: result
            }));
        });
    },
    addFriendRequest(srcUser, targetUserName) {
        return new Promise((resolve, reject) => {

            UserManager.getUser(targetUserName).then((targetUser) => {
                if (!targetUser) {
                    reject("target user '"+targetUserName+"' not exist");
                    return;
                }
                let unique;
                do {
                    unique = "FR" + Math.round(Math.random() * 99999).toString(16);
                } while(friendRequestsHash.indexOf(unique) > -1);
                let request = {
                    requestID: unique,
                    srcUser: srcUser,
                    targetUser: targetUser
                };
                friendRequests.push(request);
                friendRequestsHash.push(unique);
                resolve(request);
                let pack = JSON.stringify({
                    type: "FRIEND_REQUEST",
                    payload: {
                        requestID: unique,
                        srcUser: {
                            name: targetUser.username,
                            icon: targetUser.icon,
                            color: targetUser.color,
                            peerID: targetUser.peerID,
                        }
                    }
                });
                UserManager.ifUserOnline(targetUserName, function(user, userSocket) {
                    //send friend request
                    userSocket.send(pack);
                }, () => {
                    //save request in user queue
                    UserManager.add2UserQueue(targetUser.username, pack);
                });
            });
        });
    },
    acceptFriendRequest(socket, requestID) {
        let index = friendRequestsHash.indexOf(requestID);
        if (index < 0) {
            //@todo handle request not found
            return;
        }
        let request = friendRequests[index];
        //save friendship in both users
        UserManager.addFriend(request.srcUser, request.targetUser.username);
        UserManager.addFriend(request.targetUser, request.srcUser.username);
        socket.session.user.friends.push(request.srcUser.username);
        UserManager.ifUserOnline(request.srcUser.username, function(user, userSocket) {
            user.friends.push(request.targetUser.username);
            UserManager.friendsUpdate(userSocket);
        });
        UserManager.friendsUpdate(socket);
        friendRequestsHash.splice(index, 1);
        friendRequests.splice(index, 1);
    },
    rejectFriendRequest(socket, requestID) {
        let index = friendRequestsHash.indexOf(requestID);
        if (index < 0) {
            //@todo handle request not found
            return;
        }
        friendRequestsHash.splice(index, 1);
        friendRequests.splice(index, 1);
    },
    ifUserOnline(userName, then, els) {
        for (let i = 0; i < server.wss.clients.length; i++) {
            let socket = server.wss.clients[i];
            if (!(socket.session && socket.session.authenticated)) continue;
            if (userName === socket.session.user.username) {
                if (typeof then === "function") then(socket.session.user, socket);
                return true;
            }
        }
        if (typeof els === "function") els();
        return false;
    },
    checkOnline(userName) {
        for (let i = 0; i < server.wss.clients.length; i++) {
            let socket = server.wss.clients[i];
            if (!(socket.session && socket.session.authenticated)) continue;
            if (userName === socket.session.user.username) {
                return true;
            }
        }
        return false;
    }
};
// let sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/dashboard');
//     } else {
//         next();
//     }
// };
function AUTH(req, res, next) {
    if (!req.session.authenticated) {
        res.send("Go away!")
    } else {
        next();
    }
}
function AUTH_ADMIN(req, res, next) {
    if (req.session.authenticated && req.session.user.username === "salt") {
        next();
    } else {
        res.send("Go away!");
    }
}
app.use(express.static(path.join(__dirname + '/../src')));
// app.use(cookieParser());
// app.set('trust proxy', 1) // trust first proxy
global.sessionParser = session({
    genid: function(req) {
        return (Math.random() *999999).toString(16);
    },
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     expires: 600000
    // }
});
app.use(sessionParser);
app.use(express.json());
//@todo
// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie('user_sid');
//     }
//     next();
// });
app.use('/turn', ExpressPeerServer(server, {}));

app.get('/', function(req, res, next) {
    // res.send(port +" :: "+ ip +" :: "+ dataPath);
    res.sendFile(path.join(__dirname + '/../src/chat.html'));
});
app.get('/port', function(req, res, next) {
    // res.send(port +" :: "+ ip +" :: "+ dataPath);
    res.json({port: port});
});
app.post('/register', function (req, res, next) {
    //@todo validate
    let username    = req.body.name;
    let email       = req.body.email;
    let password    = req.body.password;
    let color       = req.body.color;
    let icon        = req.body.icon;

    let newUser = {
        username: username,
        email: email,
        password: password,
        color: color,
        icon: icon,
        friends: [],
        queue: [],
        registerDate: new Date(),
    };

    db.find({ username: username }, function (err, docs) { //if not found -> null, []
        if (docs.length > 0) {
            res.json({
                code: 2,
                msg: "Username already taken",
            });
        } else {
            db.insert(newUser, function (err, newDoc) {
                res.json({
                    code: 1,
                    msg: "successfully registered",
                });
            });
        }
    });
});
function createResponseUser(user) {
    return {
        name: user.username,
        color: user.color,
        icon: user.icon,
        friends: user.friends,
    }
}
app.post('/login', function (req, res, next) {
    db.find({ username: req.body.username }, function (err, docs) { //if not found -> null, []
        if (docs.length > 0 && docs[0].password === req.body.pass) {
            req.session.authenticated = true;
            req.session.user = docs[0];
            res.json({
                code: 1,
                msg: "logged in",
                payload: createResponseUser(docs[0]),
            });
        } else {
            res.json({
                code: 2,
                msg: "login incorrect",
            });
        }
    });
});

app.get('/logout', AUTH, function (req, res, next) {
    delete req.session.authenticated;
    res.redirect('/');
});
app.get("/howiam", function(req, res, next) {
    if (req.session.authenticated) {
        res.json({
            code: 1,
            msg: "logged in",
            payload: createResponseUser(req.session.user),
        });
    } else {
        res.json({
            code: 2,
            msg: "not logged in"
        });
    }
});
app.get("/admin", AUTH_ADMIN, function(req, res, next) {
    res.sendFile(path.join(__dirname + '/../src/admin.html'));
});
app.get("/admin/user/get/:name", AUTH_ADMIN, function(req, res, next) {
    global.UserManager.getUser(req.params.name)
        .then((user) => {
            if (!user) {
                res.json({
                    error: "user not found"
                });
                return;
            }
            res.json({
                user: {
                    name: user.username,
                    icon: user.icon,
                    color: user.color,
                    email: user.email,
                    registerDate: user.registerDate,
                    friends: user.friends,
                }
            });
        });
});
app.get("/admin/user/list/:start/:end", AUTH_ADMIN, function(req, res, next) {
    global.UserManager.find({}, {username: 1, _id: 0}).then((data) => {
        res.json(data);
    })
});

//404
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

server.on('connection', function(id) {
    // console.log("connect: ")
    // console.log(id[0])
});
server.on('disconnection', function(id) {
    // console.log("disconnect: ")
    // console.log(id)
});
