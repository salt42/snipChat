(function() {
    let html = `<div id="chatBox" class="flex-vert">
                    <div class="connection box" style="">
                        <input class="nickname" value="" placeholder="> YOUR NAME">
                        <button class="peer-id" data-ripple-color="#89669b" >Start p2p System</button>
                        <input class="target-peer-id" value="" placeholder="> TARGET PEER ID">
                        <button class="connect">Connect</button>
                        <input class="color" type="color">
                        <svg id="visualizer-in" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <defs>
                                <mask id="mask">
                                    <g id="maskGroup"></g>
                                </mask>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" style="stop-color:#ff0a0a;stop-opacity:1" />
                                    <stop offset="20%" style="stop-color:#f1ff0a;stop-opacity:1" />
                                    <stop offset="90%" style="stop-color:#d923b9;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#050d61;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" mask="url(#mask)"></rect>
                        </svg>
                        <svg id="visualizer-out" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <defs>
                                <mask id="mask">
                                    <g id="maskGroup"></g>
                                </mask>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" style="stop-color:#ff0a0a;stop-opacity:1" />
                                    <stop offset="20%" style="stop-color:#f1ff0a;stop-opacity:1" />
                                    <stop offset="90%" style="stop-color:#d923b9;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#050d61;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" mask="url(#mask)"></rect>
                        </svg>
                    </div>
                    <div class="messages">
                        <ul class="msg-box box"></ul>
                        <div class="file-widget-view box"></div>
                    </div>
                    <div class="bottom flex">
                        <div class="functions box">
                            <button><i class="fa fa-blind"></i></button>
                            <button><i class="fa fa-bell-slash"></i></button>
                            <button><i class="fa fa-bell"></i></button>
                            <button><i class="fa fa-blind"></i></button>
                            <button><i class="fa fa-blind"></i></button>
                            <button><i class="fa fa-blind"></i></button>
                            <button><i class="fa fa-blind"></i></button>
                            <button><i class="fa fa-blind"></i></button>
                        </div>
                        <div class="send box">
                            <input class="chat-send-msg" placeholder="> Type in chat message!">
                            <select class="language"></select>
                            <button class="send-code">Send Code</button>
                            <button class="dropBox"><i class="fas fa-cloud-upload-alt"></i> Drag file here</button>
                            <div class="code-view" style="min-width: 200px; height: 90px;"></div>
                        </div>
                        <div class="peer-list box"> 
                            <h2>Peers</h2>
                        </div>
                    </div>
                </div>`;
    $(document.body).append(html);

    let G = {
            chat: {},
            audio: {}
        },
        peer,
        peerID,
        peerNick = "",
        $chatBox = $("#chatBox"),
        $id = $("#chatBox .peer-id"),
        $nickname = $("#chatBox .nickname"),
        $target = $("#chatBox .target-peer-id"),
        $connect = $("#chatBox .connect"),
        $msgBox = $("#chatBox .msg-box"),
        $fileWidgetView = $("#chatBox .file-widget-view"),
        $input = $("#chatBox .chat-send-msg"),
        $dropBox = $("#chatBox .dropBox"),
        $sendCode = $("#chatBox .send-code"),
        $langSelect = $("#chatBox select.language"),
        $color = $("#chatBox .connection .color"),
        $codeView,
        $receivedCodeView,
        codeViewFlask,
        connectedChatPeers = {},
        connectedFilePeers = {},
        peers = {},
        lastLanguage,
        lastColor,
        inputCode,
        chatConf = {
            label: 'chat',
            serialization: 'json',
            metadata: {
                nickname: "",
                color: ""
            }
        },
        fileConf = {
            label: 'file',
            reliable: true,
            metadata: {}
        };

    /*region p2p handling */
    function addPeer(peerID, nickname, color) {
        if (!peers.hasOwnProperty(peerID)) {
            peers[peerID] = {
                chatConn: null,
                fileConn: null,
                nickname: nickname,
                peer: peerID,
                color: color
            };
            updatePeerList();
        }
    }
    function startP2P(nickname) {
        return new Promise(function (resolve, reject) {
            chatConf.metadata.nickname = nickname;
            chatConf.metadata.color = lastColor;
            peerNick = nickname;
            peer = new Peer({key: 'znx52etk7is8m2t9'});
            peer.on('open', function(id) {
                peerID = id;
                fireEvent("onPeerStart", peer, peerID, nickname);
                resolve();
            });
            peer.on('error', function(err) {
                reject(err);
                console.log(err);
            });
            peer.on('connection', function(conn) {
                if (conn.label === "chat") {
                    addPeer(conn.peer, conn.metadata.nickname, conn.metadata.color);
                    handleChatConnection(conn);
                    setTimeout(() => {
                        conn.send({
                            com: "handshake",
                            nickname: peerNick,
                            color: lastColor
                        });
                        sendPeerUpdate();
                    }, 500)
                } else {
                    handleFileConnection(conn);
                }
            });
        });
    }
    function updatePeerList() {
        console.log(peers)
    }
    function closePeer(id) {
        delete peers[id];
        delete connectedChatPeers[id];
    }
    function peerToNick(id) {
        if(peers.hasOwnProperty(id)) {
            return peers[id].nickname;
        }
        return id;
    }
    function nickToPeer(nick) {
        for (let peer in peers) {
            if (peers[peer].nickname === nick) return peer;
        }
        return false;
    }
    function handleChatConnection(conn) {
        connectedChatPeers[conn.peer] = conn;
        peers[conn.peer].chatConn = conn;
        conn.on('data', function(data) {
            switch (data.com) {
                case "chat":
                    write(conn.peer, data.msg);
                    break;
                // case "code":
                //     let codeId = G.codeHistory.push(data);
                //     showCode(data);
                //     writeWidget("code", `<span>CODE: ${data.language}</span>`)
                //         .data("id", codeId);
                //     break;
                case "peerUpdate":
                    for (let i = 0; i < data.peers.length; i++) {
                        let peer = data.peers[i];
                        if (peer.peerID === peerID) continue;
                        if (!(peers.hasOwnProperty(peer.peerID) && peer.peerID) ) {
                            connectTo(peer.peerID);
                        }
                    }
                    break;
                case "handshake":
                    peers[conn.peer].nickname = data.nickname;
                    peers[conn.peer].color = data.color;
                    sendPeerUpdate();
                    updatePeerList();
                    break;
                default:
                    let funcName = "on" + data.com.charAt(0).toUpperCase() + data.com.slice(1);
                    for (let i = 0; i < widgets.length; i++) {
                        let widget = widgets[i];
                        if (widget.hasOwnProperty(funcName) ) {
                            widget[funcName](data);
                        }
                    }
            }
        });
        conn.on('close', function() {
            closePeer(conn.peer);
            write("System", "chat connection closed: " + conn.peer);
        });
        write("System", "chat connection opened: " + conn.peer);
    }
    function sendPeerUpdate() {
        let updateList = [];
        for (let peer in peers) {
            updateList.push({
                peerID: peers[peer].peer,
                nickname: peers[peer].nickname,
                color: peers[peer].color
            });
        }
        updateList.push({
            peerID: peerID,
            nickname: peerNick,
            color: lastColor
        });
        broadcast((c) => {
            c.send({
                com: "peerUpdate",
                peers: updateList
            });
        })
    }
    function handleFileConnection(conn) {
        connectedFilePeers[conn.peer] = conn;
        // Receive messages
        let fileMeta;
        conn.on('data', function(data) {
            console.log('Received', data);
            // If we're getting a file, create a URL for it.
            if (data.constructor === ArrayBuffer) {
                if (!fileMeta) return;//@todo error
                console.log(fileMeta);
                let dataView = new Uint8Array(data);
                let dataBlob = new Blob([dataView]);
                let url = window.URL.createObjectURL(dataBlob);
                let user = conn.peer;
                let template =
                    `<a href="${url}" download="${fileMeta.name}">
                            <i class="fas fa-cloud-download-alt">🖫</i>
                            <span>File</span>
                            <ul>
                                <li>Name: <span class="name">${fileMeta.name}</span></li>
                                <li>User: <span class="source">${user}</span></li>
                                <li>Size: <span class="size">${humanFileSize(fileMeta.size, true)}</span></li>
                            </ul>
                    </a>`;
                writeWidget("file", template);
                fileMeta = null;
            } else {
                //meta data
                try {
                    fileMeta = JSON.parse(data);
                } catch (e) {
                    console.log("can't parse received data!", data);
                    return;
                }
            }
        });
        conn.on('close', function() {
            delete connectedFilePeers[conn.id];
            write("System", "file connection closed: " + conn.peer);
        });
        write("System", "file connection opened: " + conn.peer);
    }
    function connectTo(peerID) {
        return new Promise(function (resolve, reject) {
            if (peers.hasOwnProperty(peerID)) {
                reject("already connected to " + peerID);
                return;
            }
            let con = peer.connect(peerID, chatConf);
            con.on('open', function() {
                addPeer(peerID, "", "");
                handleChatConnection(con);
                resolve();

                let conFile = peer.connect(peerID, fileConf);
                conFile.on('open', function() {
                    handleFileConnection(conFile);
                });
                conFile.on('error', function(err) {
                    console.log(err);
                });
            });
            con.on('error', function(err) {
                console.log(err);
            });
        });
    }
    // DEPRECATED USE BROADCAST INSTEAD! Goes through each active peer and calls FN on its connections.
    function eachActiveChatConnection(fn) {
        for (let peerID in connectedChatPeers) {
            if (connectedChatPeers.hasOwnProperty(peerID)) {
                fn(connectedChatPeers[peerID], connectedFilePeers[peerID]);
            }
        }
    }
    function broadcast(fn) {
        for (let peerID in connectedChatPeers) {
            if (connectedChatPeers.hasOwnProperty(peerID)) {
                fn(connectedChatPeers[peerID], connectedFilePeers[peerID]);
            }
        }
    }
    /*endregion*/

    /*region chat */
    function write(sender, text) {
        $msgBox.prepend('<li><span class="' + sender + '">[' + sender + '] </span>' + text + '</li>');
    }
    function error(msg) {
        $msgBox.prepend('<li><span class="error">[ERROR] </span>' + msg + '</li>');
    }
    function writeWidget(name, html) {
        let $element = $( `<li class="inline-widget" name="${name}">` + html + '</li>');
        $msgBox.prepend($element);
        return $element;
    }
    /*endregion*/

    /*region utils */
    function humanFileSize(bytes, si) {
        var thresh = si ? 1000 : 1024;
        if(Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }
        var units = si
            ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
            : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while(Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1)+' '+units[u];
    }
    function hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    /*endregion*/

    function closeAll() {
        eachActiveConnection(function(c) {
            c.close();
        });
    }
    function sendChatMsg(msg) {
        eachActiveChatConnection(function(c) {
            if (c.label === 'chat') {
                c.send({
                    com: "chat",
                    msg: msg
                });
                write("You", msg);
            }
        });
        $('#text').val('');
        $('#text').focus();
    }
    function sendCode(language, code, id = false) {
        let codeId = G.codeHistory.push({
            code: code,
            language: language
        });
        if (!id) {
            eachActiveChatConnection(function(c) {
                if (c.label === 'chat') {
                    c.send({
                        com: "code",
                        code: code,
                        language: language
                    });
                    writeWidget("code", `<span>CODE: ${language}</span>`)
                        .data("id", codeId);
                }
            });
        } else {
            //@todo send to this one
        }
        // codeViewFlask.update("");
        // let html = Prism.highlight(text, Prism.languages.javascript);
        // $(".test").append(html);
    }
    function sendFile(file, id = false) {
        console.log(file);
        if (!id) {
            eachActiveChatConnection(function (conn, fileConn) {
                if (fileConn.label === 'file') {
                    fileConn.send(JSON.stringify({
                        lastModified: file.lastModified,
                        lastModifiedDate: file.lastModifiedDate,
                        name: file.name,
                        size: file.size,
                        type: file.type,
                    }));
                    fileConn.send(file);
                    writeWidget("file-send", `<span>FILE SEND</span>`);
                }
            });
        } else {
            //@todo send to this one
        }
    }
    function onCommand(str) {
        let args = str.match(/\w+|"[^"]+"/g);
        let com = args[0];
        if (!commands.hasOwnProperty(com) ) {
            //command not found!
            error("Command '" + com + "' not found!");
            return;
        }
        commands[com].run.apply(null, args.slice(1));
    }
    function setColor(hexCode) {
        localStorage.setItem("lastColor", hexCode);
        let rgb = hexToRgb(hexCode);
        $color.val(hexCode);
        $chatBox[0].style.setProperty("--color", hexCode);
        $chatBox[0].style.setProperty("--colorRGB", rgb.r + ", " + rgb.g + ", " + rgb.b);
    }
    function showCode(data) {
        // $receivedCodeView.val(data.code);
        openFileWidget("code", data.language, data.code);
    }
    G.audio.connect = function(stream) {
        // let captureStream = $audioOut[0].captureStream(stream);
        // $audioOut[0].play();

        var audio = $('<audio autoplay />').appendTo('body');
        audio[0].src = URL.createObjectURL(stream);

        // var outputTracks = [];
        // outputTracks = outputTracks.concat(outputAudioStream.getTracks());
        // outputTracks = outputTracks.concat(outputVideoStream.getTracks());
        // outputMediaStream = new MediaStream(outputTracks);
    };

    /*region widget handling */
    let widgets = {};
    let commands = {};
    let fileTypes = new Map();
    let openWidget = null;

    class BaseWidget {
        constructor(id) {
            this.id = id;
        }
        closeView() {
            openWidget = null;
        }
        openView() {
            openWidget = this.id;
        }
    }
    function Widget(id, fn) {
        if (widgets.hasOwnProperty(id)) throw new Error("widget id already taken!");
        let widget = new BaseWidget();
        fn.call(widget, G);
        if (widget.hasOwnProperty("command") ) {
            if (commands.hasOwnProperty(widget.command)) throw new Error("Command '" + widget.command + "' exists already!");
            commands[widget.command] = widget;
        }
        if (widget.hasOwnProperty("fileType") ) {
            if (fileTypes.has(widget.fileType)) throw new Error("FileType '" + widget.fileType + "' exists already!");
            fileTypes[widget.fileType] = widget;
        }
        widgets[id] = widget;
    }
    function fireEvent(name, ...args) {
        for (let widget in widgets) {
            widget = widgets[widget];
            if (widget.hasOwnProperty(name) && typeof widget[name] === "function") {
                widget[name](...args)
            }
        }
    }
    function openFileWidget(widgetID, ...args) {
        if (!widgets.hasOwnProperty(widgetID)) throw new Error("widget with id '" + widgetID + "' not found!");
        if (openWidget) widgets[openWidget].closeView();
        $fileWidgetView.empty();
        widgets[widgetID].openView($fileWidgetView, ...args);
    }
    function openFile(mimeType, blob) {
        if (!mimeTypes.has(mimeType)) {

        }
        // widgets[widgetID].openView();
        return true;
    }
    function canUseMIMEtype(mimeType) {
        return true;
    }
    /*endregion*/

    G.peerToNick = peerToNick;
    G.nickToPeer = nickToPeer;
    G.chat.write = write;
    G.chat.error = error;
    G.chat.writeWidget = writeWidget;
    //ui events
    function initUIevents() {
        $id.on('click', function(e) {
            let nickname = $nickname.val();
            if (!nickname || nickname === "") {
                error("Please select Nickname!");
                return;
            }
            if (!peer) {
                $id.text("Loading...");
                startP2P(nickname).then(()=>{
                    $id.text("Copy ID");
                    $nickname.val(peerID);
                });
            } else {
                //copy
                let copyText = $nickname[0];
                /* Select the text field */
                copyText.select();
                /* Copy the text inside the text field */
                document.execCommand("Copy");
                /* Alert the copied text */
            }
        });
        $connect.on('click', function(e) {
            let target = $target.val();
            if (!target || target === "") {
                write("System", "please insert target id");
                return;
            }
            if (!connectedChatPeers.hasOwnProperty(target) || !connectedChatPeers[target].open ) {
                write("System", "Connecting to: " + target);
                connectTo(target);
            } else {
                write("System", "Already connected to: " + target);
            }
        });
        $sendCode.click(function() {
            inputCode = codeViewFlask.getCode();
            let lang = $langSelect.val();
            sendCode(lang, inputCode);
        });
        $input.on("keyup", function(e) {
            if (e.keyCode === 13) { //Enter
                let msg = $input.val();
                if (!msg || msg === "") return;
                if (msg.substring(0, 1) === "/") {
                    onCommand(msg);
                } else {
                    sendChatMsg(msg);
                }
                $input.val("");
            }
        });
        $langSelect.on("change", function (e) {
            lastLanguage = $langSelect.val();
            // let code = $codeView.val();
            codeViewFlask.run(".code-view", { language: lastLanguage});
            localStorage.setItem("lastCodeLanguage", lastLanguage);
        });
        $msgBox.on("click", '.inline-widget[name="code"]', function (e) {
            let id = $(this).data("id");
            showCode(G.codeHistory[id]);
        });
        // Prepare file drop box.
        $dropBox.on('dragenter', (e) => {
            e.preventDefault();
            e.stopPropagation();
            $dropBox.addClass("hover");
        });
        $dropBox.on('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.originalEvent.dataTransfer.dropEffect = 'copy';
        });
        $dropBox.on('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            $dropBox.removeClass("hover");
        });
        $dropBox.on('drop', function (e) {
            e.preventDefault();
            $dropBox.removeClass("hover");
            let file = e.originalEvent.dataTransfer.files[0];
            sendFile(file);
        });
        $color.on("change", function(e) {
            setColor(e.target.value);
        });
    }
    $(document).ready(function() {
        //color
        lastColor = localStorage.getItem("lastColor");
        if (!lastColor) {
            lastColor = getComputedStyle($chatBox[0]).getPropertyValue("--color").trim();
            localStorage.setItem("lastColor", lastColor);
        }
        setColor(lastColor);
        //last language
        for (let lang in Prism.languages) {
            if (typeof Prism.languages[lang] === "object") {
                $langSelect.append(`<option value="${lang}">${lang}</option>`);
            }
        }
        lastLanguage = localStorage.getItem("lastCodeLanguage");
        if (!lastLanguage) {
            lastLanguage = "javascript";
            localStorage.setItem("lastCodeLanguage", lastLanguage);
        }
        $langSelect.val(lastLanguage);
        codeViewFlask = new CodeFlask();
        codeViewFlask.run(".code-view", { language: lastLanguage});

        $codeView = $("#chatBox .code-view textarea");
        $receivedCodeView = $("#chatBox .received-code-view textarea");
        initUIevents();
    });
    // window.addEventListener('load', startup, false);
    window.onunload = window.onbeforeunload = function(e) {
        if (!!peer && !peer.destroyed) {
            peer.destroy();
        }
    };
    //ripple effect
    $('button').on('click', function (event) {
        event.preventDefault();
        let $div = $('<div/>'),
            btnOffset = $(this).offset(),
            xPos = event.pageX - btnOffset.left,
            yPos = event.pageY - btnOffset.top;



        $div.addClass('ripple-effect');
        let $ripple = $(".ripple-effect");

        $ripple.css("height", $(this).height());
        $ripple.css("width", $(this).height());
        $div
            .css({
                top: yPos - ($ripple.height()/2),
                left: xPos - ($ripple.width()/2),
                background: $(this).data("ripple-color")
            })
            .appendTo($(this));

        window.setTimeout(function(){
            $div.remove();
        }, 2000);
    });

    Widget("test", function(G) {
        let history = [];
        let oPush = history.push;
        history.push = (e) => {
            return oPush.call(history, e)-1;
        };
        G.codeHistory = history;

        this.onCode = (data) => {
            let codeId = G.codeHistory.push(data);
            showCode(data);
            writeWidget("code", `<span>CODE: ${data.language}</span>`)
                .data("id", codeId);
        };
    });
    Widget("code", function(G) {
        let receivedCodeViewFlask;
        let history = [];
        let oPush = history.push;
        history.push = (e) => {
            return oPush.call(history, e)-1;
        };
        G.codeHistory = history;

        this.openView = ($container, language, code) => {
            // super.openView();
        // <div class="received-code-view box" style="min-width: 200px; height: 100%; flex-grow: 5;overflow: hidden;"></div>
            let id = "U" + (Math.round(Math.random()* 99999999999)).toString(16);
            $container.append('<div id="'+ id +'" class="widget-code-view"></div>');
            receivedCodeViewFlask = new CodeFlask();
            // receivedCodeViewFlask.run(".received-code-view", { language: 'js'});
            receivedCodeViewFlask.run("#" + id, { language: language});
            receivedCodeViewFlask.update(code);
        };
        this.onCode = (data) => {
            let codeId = G.codeHistory.push(data);
            showCode(data);
            writeWidget("code", `<span>CODE: ${data.language}</span>`)
                .data("id", codeId);
        };
    });
    Widget("call", function(G) {
        let constraints = { audio: true, video: false };
        this.command = "call";
        this.run = (target, msg) => {
            G.chat.writeWidget("call", `<span>CALLING ${target}</span>`);
            call(target).then(() => {
                console.log("nice")
            });
        };
        this.openFile = (file) => {

        };
        this.onPeerStart = (peer, peerID) => {
            peer.on('call', function(call) {
                call.on('stream', function(stream) {
                    visualize("in", stream);
                    G.audio.connect(stream);
                });
                new Promise(function (resolve, reject) {
                    let peer = "USER";
                    let $ele = G.chat.writeWidget("callIn", `<span>Incoming Call ${peer}</span><span class="fas fa-phone answer-call">ANSWER</span><span class="fas fa-phone reject-call">REJECT</span>`);
                    $(".answer-call", $ele).on("click", function answerCall(e) {
                        console.log("click");
                        resolve();
                        $(".answer-call", $ele).off("click", answerCall);
                    });
                    $(".reject-call", $ele).on("click", function rejectCall(e) {
                        console.log("click");
                        reject();
                        $(".reject-call", $ele).off("click", rejectCall);
                    });
                }).then(() => {
                    let constraints = { audio: true, video: false };
                    navigator.mediaDevices.getUserMedia(constraints)
                        .then(function(stream) {
                            visualize("out", stream);
                            // Answer the call, providing our mediaStream
                            call.answer(stream);
                        })
                        .catch(function(err) {
                            reject(err);
                            console.error(err);
                        });
                }, (err) => {
                    call.close();
                });
            });
        };
        function call(nick) {
            return new Promise(function (resolve, reject) {
                let targetPeer = G.nickToPeer(nick);
                if (targetPeer === false) {
                    reject("Peer does not exists!");
                    return;
                }
                navigator.mediaDevices.getUserMedia(constraints)
                    .then(function(ownStream) {
                        let call = peer.call(targetPeer, ownStream);

                        call.on('stream', function(stream) {
                            visualize("out", ownStream);
                            visualize("in", stream);
                            G.audio.connect(stream);
                        });
                        /* use the stream */
                    })
                    .catch(function(err) {
                        reject(err);
                        console.error(err);
                    });
            });
            // Call a peer, providing our mediaStream
        }
        function visualize(type, stream) {
            let path;
            let visualizer = $('#visualizer-' + type)[0];
            if (!visualizer) return;
            let paths = visualizer.getElementsByTagName('path');
            let mask = $('#mask', visualizer)[0];

            let audioContent = new AudioContext();
            let audioStream = audioContent.createMediaStreamSource( stream );
            let analyser = audioContent.createAnalyser();

            audioStream.connect(analyser);
            analyser.fftSize = 1024;

            var frequencyArray = new Uint8Array(analyser.frequencyBinCount);
            visualizer.setAttribute('viewBox', '0 0 255 255');

            //Through the frequencyArray has a length longer than 255, there seems to be no
            //significant data after this point. Not worth visualizing.
            for (var i = 0 ; i < 255; i++) {
                path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('stroke-dasharray', '4,1');
                mask.appendChild(path);
            }
            var doDraw = function () {
                requestAnimationFrame(doDraw);
                analyser.getByteFrequencyData(frequencyArray);
                var adjustedLength;
                for (var i = 0 ; i < 255; i+=4) {
                    adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
                    paths[i].setAttribute('d', 'M '+ (i) +',255 l 0,-' + adjustedLength);
                }

            };
            doDraw();
        }
    });


    (()=> {
        for (let i = 0; i < 30; i++) {
            write("test", "lorem ipsum est")
        }

        let target = "salt";
        let peer = "dr.who";
        let data = {language:"javascript"};
        let url = "url";
        let fileMeta = {
            name: "filename.js",
            size: 21345,
        };
        let user = "salt";

        writeWidget("code", `<span>CODE: ${data.language}</span>`)
        G.chat.writeWidget("call", `<span>CALLING ${target}</span>`);
        G.chat.writeWidget("callIn", `<span>Incoming Call ${peer}</span><span class="fas fa-phone answer-call">ANSWER</span><span class="fas fa-phone reject-call">REJECT</span>`);
        let template =
            `<a href="${url}" download="${fileMeta.name}">
                            <i class="fas fa-cloud-download-alt">🖫</i>
                            <span>File</span>
                            <ul>
                                <li>Name: <span class="name">${fileMeta.name}</span></li>
                                <li>User: <span class="source">${user}</span></li>
                                <li>Size: <span class="size">${humanFileSize(fileMeta.size, true)}</span></li>
                            </ul>
                    </a>`;
        writeWidget("file", template);

        write("DEV", "<span style='color: #ff00ee'>Style mich!</span>>")
    })();
})();