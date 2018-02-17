(function($) {
    $.fn.colorInput = function(color) {
        if (!this.is('input[type="color"]')) throw new Error("Element is not a input type color");
        let $ele = this;
        if (color && typeof color === "string" && color !== "") $ele.val(color);
        let colorInput = $ele.data("colorInput");
        if (colorInput) {
            return colorInput;
        } else {
            let handler = {
                getColor() {
                    return $ele.val();
                },
                setColor(hexCode) {
                    if (hexCode && typeof hexCode === "string" && hexCode !== "") $ele.val(hexCode);
                }
            };
            $ele.data("colorInput", handler);
            return handler;
        }
    };
}(jQuery));
(function() {
    let icons = ["address-book","address-card","adjust","align-center","align-justify","align-left","align-right","ambulance","american-sign-language-interpreting","anchor","angle-double-down","angle-double-left","angle-double-right","angle-double-up","angle-down","angle-left","angle-right","angle-up","archive","arrow-alt-circle-down","arrow-alt-circle-left","arrow-alt-circle-right","arrow-alt-circle-up","arrow-circle-down","arrow-circle-left","arrow-circle-right","arrow-circle-up","arrow-down","arrow-left","arrow-right","arrow-up","arrows-alt","arrows-alt-h","arrows-alt-v","assistive-listening-systems","asterisk","at","audio-description","backward","balance-scale","ban","barcode","bars","baseball-ball","basketball-ball","bath","battery-empty","battery-full","battery-half","battery-quarter","battery-three-quarters","bed","beer","bell","bell-slash","bicycle","binoculars","birthday-cake","blind","bold","bolt","bomb","book","bookmark","bowling-ball","braille","briefcase","bug","building","bullhorn","bullseye","bus","calculator","calendar","calendar-alt","calendar-check","calendar-minus","calendar-plus","calendar-times","camera","camera-retro","car","caret-down","caret-left","caret-right","caret-square-down","caret-square-left","caret-square-right","caret-square-up","caret-up","cart-arrow-down","cart-plus","certificate","chart-area","chart-bar","chart-line","chart-pie","check","check-circle","check-square","chess","chess-bishop","chess-board","chess-king","chess-knight","chess-pawn","chess-queen","chess-rook","chevron-circle-down","chevron-circle-left","chevron-circle-right","chevron-circle-up","chevron-down","chevron-left","chevron-right","chevron-up","child","circle","circle-notch","clipboard","clock","clone","closed-captioning","cloud","cloud-download-alt","cloud-upload-alt","code","code-branch","coffee","cog","cogs","columns","comment","comment-alt","comments","compass","compress","copy","copyright","credit-card","crop","crosshairs","cube","cubes","cut","database","deaf","desktop","dollar-sign","dot-circle","download","edit","eject","ellipsis-h","ellipsis-v","envelope","envelope-open","envelope-square","eraser","euro-sign","exchange-alt","exclamation","exclamation-circle","exclamation-triangle","expand","expand-arrows-alt","external-link-alt","external-link-square-alt","eye","eye-dropper","eye-slash","fast-backward","fast-forward","fax","female","fighter-jet","file","file-alt","file-archive","file-audio","file-code","file-excel","file-image","file-pdf","file-powerpoint","file-video","file-word","film","filter","fire","fire-extinguisher","flag","flag-checkered","flask","folder","folder-open","font","football-ball","forward","frown","futbol","gamepad","gavel","gem","genderless","gift","glass-martini","globe","golf-ball","graduation-cap","h-square","hand-lizard","hand-paper","hand-peace","hand-point-down","hand-point-left","hand-point-right","hand-point-up","hand-pointer","hand-rock","hand-scissors","hand-spock","handshake","hashtag","hdd","heading","headphones","heart","heartbeat","history","hockey-puck","home","hospital","hourglass","hourglass-end","hourglass-half","hourglass-start","i-cursor","id-badge","id-card","image","images","inbox","indent","industry","info","info-circle","italic","key","keyboard","language","laptop","leaf","lemon","level-down-alt","level-up-alt","life-ring","lightbulb","link","lira-sign","list","list-alt","list-ol","list-ul","location-arrow","lock","lock-open","long-arrow-alt-down","long-arrow-alt-left","long-arrow-alt-right","long-arrow-alt-up","low-vision","magic","magnet","male","map","map-marker","map-marker-alt","map-pin","map-signs","mars","mars-double","mars-stroke","mars-stroke-h","mars-stroke-v","medkit","meh","mercury","microchip","microphone","microphone-slash","minus","minus-circle","minus-square","mobile","mobile-alt","money-bill-alt","moon","motorcycle","mouse-pointer","music","neuter","newspaper","object-group","object-ungroup","outdent","paint-brush","paper-plane","paperclip","paragraph","paste","pause","pause-circle","paw","pen-square","pencil-alt","percent","phone","phone-square","phone-volume","plane","play","play-circle","plug","plus","plus-circle","plus-square","podcast","pound-sign","power-off","print","puzzle-piece","qrcode","question","question-circle","quidditch","quote-left","quote-right","random","recycle","redo","redo-alt","registered","reply","reply-all","retweet","road","rocket","rss","rss-square","ruble-sign","rupee-sign","save","search","search-minus","search-plus","server","share","share-alt","share-alt-square","share-square","shekel-sign","shield-alt","ship","shopping-bag","shopping-basket","shopping-cart","shower","sign-in-alt","sign-language","sign-out-alt","signal","sitemap","sliders-h","smile","snowflake","sort","sort-alpha-down","sort-alpha-up","sort-amount-down","sort-amount-up","sort-down","sort-numeric-down","sort-numeric-up","sort-up","space-shuttle","spinner","square","square-full","star","star-half","step-backward","step-forward","stethoscope","sticky-note","stop","stop-circle","stopwatch","street-view","strikethrough","subscript","subway","suitcase","sun","superscript","sync","sync-alt","table","table-tennis","tablet","tablet-alt","tachometer-alt","tag","tags","tasks","taxi","terminal","text-height","text-width","th","th-large","th-list","thermometer-empty","thermometer-full","thermometer-half","thermometer-quarter","thermometer-three-quarters","thumbs-down","thumbs-up","thumbtack","ticket-alt","times","times-circle","tint","toggle-off","toggle-on","trademark","train","transgender","transgender-alt","trash","trash-alt","tree","trophy","truck","tty","tv","umbrella","underline","undo","undo-alt","universal-access","university","unlink","unlock","unlock-alt","upload","user","user-circle","user-md","user-plus","user-secret","user-times","users","utensil-spoon","utensils","venus","venus-double","venus-mars","video","volleyball-ball","volume-down","volume-off","volume-up","wheelchair","wifi","window-close","window-maximize","window-minimize","window-restore","won-sign","wrench","yen-sign","address-book","address-card","arrow-alt-circle-down","arrow-alt-circle-left","arrow-alt-circle-right","arrow-alt-circle-up","bell","bell-slash","bookmark","building","calendar","calendar-alt","calendar-check","calendar-minus","calendar-plus","calendar-times","caret-square-down","caret-square-left","caret-square-right","caret-square-up","chart-bar","check-circle","check-square","circle","clipboard","clock","clone","closed-captioning","comment","comment-alt","comments","compass","copy","copyright","credit-card","dot-circle","edit","envelope","envelope-open","eye-slash","file","file-alt","file-archive","file-audio","file-code","file-excel","file-image","file-pdf","file-powerpoint","file-video","file-word","flag","folder","folder-open","frown","futbol","gem","hand-lizard","hand-paper","hand-peace","hand-point-down","hand-point-left","hand-point-right","hand-point-up","hand-pointer","hand-rock","hand-scissors","hand-spock","handshake","hdd","heart","hospital","hourglass","id-badge","id-card","image","images","keyboard","lemon","life-ring","lightbulb","list-alt","map","meh","minus-square","money-bill-alt","moon","newspaper","object-group","object-ungroup","paper-plane","pause-circle","play-circle","plus-square","question-circle","registered","save","share-square","smile","snowflake","square","star","star-half","sticky-note","stop-circle","sun","thumbs-down","thumbs-up","times-circle","trash-alt","user","user-circle","window-close","window-maximize","window-minimize","window-restore","500px","accessible-icon","accusoft","adn","adversal","affiliatetheme","algolia","amazon","amazon-pay","amilia","android","angellist","angrycreative","angular","app-store","app-store-ios","apper","apple","apple-pay","asymmetrik","audible","autoprefixer","avianex","aviato","aws","bandcamp","behance","behance-square","bimobject","bitbucket","bitcoin","bity","black-tie","blackberry","blogger","blogger-b","bluetooth","bluetooth-b","btc","buromobelexperte","buysellads","cc-amazon-pay","cc-amex","cc-apple-pay","cc-diners-club","cc-discover","cc-jcb","cc-mastercard","cc-paypal","cc-stripe","cc-visa","centercode","chrome","cloudscale","cloudsmith","cloudversify","codepen","codiepie","connectdevelop","contao","cpanel","creative-commons","css3","css3-alt","cuttlefish","d-and-d","dashcube","delicious","deploydog","deskpro","deviantart","digg","digital-ocean","discord","discourse","dochub","docker","draft2digital","dribbble","dribbble-square","dropbox","drupal","dyalog","earlybirds","edge","elementor","ember","empire","envira","erlang","ethereum","etsy","expeditedssl","facebook","facebook-f","facebook-messenger","facebook-square","firefox","first-order","firstdraft","flickr","flipboard","fly","font-awesome","font-awesome-alt","font-awesome-flag","fonticons","fonticons-fi","fort-awesome","fort-awesome-alt","forumbee","foursquare","free-code-camp","freebsd","get-pocket","gg","gg-circle","git","git-square","github","github-alt","github-square","gitkraken","gitlab","gitter","glide","glide-g","gofore","goodreads","goodreads-g","google","google-drive","google-play","google-plus","google-plus-g","google-plus-square","google-wallet","gratipay","grav","gripfire","grunt","gulp","hacker-news","hacker-news-square","hips","hire-a-helper","hooli","hotjar","houzz","html5","hubspot","imdb","instagram","internet-explorer","ioxhost","itunes","itunes-note","jenkins","joget","joomla","js","js-square","jsfiddle","keycdn","kickstarter","kickstarter-k","korvue","laravel","lastfm","lastfm-square","leanpub","less","line","linkedin","linkedin-in","linode","linux","lyft","magento","maxcdn","medapps","medium","medium-m","medrt","meetup","microsoft","mix","mixcloud","mizuni","modx","monero","napster","nintendo-switch","node","node-js","npm","ns8","nutritionix","odnoklassniki","odnoklassniki-square","opencart","openid","opera","optin-monster","osi","page4","pagelines","palfed","patreon","paypal","periscope","phabricator","phoenix-framework","php","pied-piper","pied-piper-alt","pied-piper-pp","pinterest","pinterest-p","pinterest-square","playstation","product-hunt","pushed","python","qq","quinscape","quora","ravelry","react","rebel","red-river","reddit","reddit-alien","reddit-square","rendact","renren","replyd","resolving","rocketchat","rockrms","safari","sass","schlix","scribd","searchengin","sellcast","sellsy","servicestack","shirtsinbulk","simplybuilt","sistrix","skyatlas","skype","slack","slack-hash","slideshare","snapchat","snapchat-ghost","snapchat-square","soundcloud","speakap","spotify","stack-exchange","stack-overflow","staylinked","steam","steam-square","steam-symbol","sticker-mule","strava","stripe","stripe-s","studiovinari","stumbleupon","stumbleupon-circle","superpowers","supple","telegram","telegram-plane","tencent-weibo","themeisle","trello","tripadvisor","tumblr","tumblr-square","twitch","twitter","twitter-square","typo3","uber","uikit","uniregistry","untappd","usb","ussunnah","vaadin","viacoin","viadeo","viadeo-square","viber","vimeo","vimeo-square","vimeo-v","vine","vk","vnv","vuejs","weibo","weixin","whatsapp","whatsapp-square","whmcs","wikipedia-w","windows","wordpress","wordpress-simple","wpbeginner","wpexplorer","wpforms","xbox","xing","xing-square","y-combinator","yahoo","yandex","yandex-international","yelp","yoast","youtube","youtube-square"];
    let html = `<div id="chatBox" class="flex-vert">
                    <div class="connection box">
                        <span class="peer-info"></span>
                        <select class="peer-icon"></select>
                        <input class="peer-color" type="color">
                        <input class="peer-nickname" value="" placeholder="> YOUR NAME">
                        <button class="peer-login" data-ripple-color="#89669b" >Start p2p System</button>
                        
                        <input class="target-peer-id" value="" placeholder="> TARGET PEER ID">
                        <button class="connect">Connect</button>
                        <input class="color" type="color">
                        <svg id="audio-out-visual" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
                        <div class="send box">
                            <input class="chat-send-msg" placeholder="> Type in chat message!">
                            <button class="send-msg"><i class="fab fa-accessible-icon fa-lg"></i></button>
                            <button class="dropBox"><i class="fas fa-cloud-upload-alt"></i> Drag file here</button>
                        </div>
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
                        <ul class="peer-list box"></ul>
                    </div>
                </div>`;
    $(document.body).append(html);

    let G = {
            $chatBox: $("#chatBox"),
            chat: {},
            UI: {},
            audio: {}
        },
        peer,
        peerID,
        peerNick = "",
        $chatBox = $("#chatBox"),
        $peerInfo = $("#chatBox .peer-info"),
        $peerIcon = $("#chatBox .peer-icon"),
        peerSelect,
        $peerColor = $("#chatBox .peer-color"),
        peerColor = $peerColor.colorInput(),
        $peerNick = $("#chatBox .peer-nickname"),
        $peerLogin = $("#chatBox .peer-login"),
        $peerList = $("#chatBox .peer-list"),
        $nickname = $("#chatBox .user-nickname"),
        $target = $("#chatBox .target-peer-id"),
        $connect = $("#chatBox .connect"),
        $msgBox = $("#chatBox .msg-box"),
        $fileWidgetView = $("#chatBox .file-widget-view"),
        $input = $("#chatBox .chat-send-msg"),
        $dropBox = $("#chatBox .dropBox"),
        $color = $("#chatBox .connection .color"),
        connectedChatPeers = {},
        connectedFilePeers = {},
        peers = {},
        lastLanguage,
        lastColor,
        inputCode,
        chatConf = {
            label: 'chat',
            serialization: 'json',
            metadata: {//on change -> search handshake and update the related stuff
                nickname: "",
                color: "",
                icon: "yelp",
                bs: "",//browser id
            }
        },
        fileConf = {
            label: 'file',
            reliable: true,
            metadata: {}
        },
        _Config = localStorage.getItem("chatBox.config");
        if (!_Config) {
            _Config = {};
        }
        G.config = {
            set(key, value) {
                if (!_Config.hasOwnProperty(key)) return false;
                _Config[key] = value;
                return true;
            },
            has(key) {
                return (_Config.hasOwnProperty(key));
            },
            get(key) {
                if (!_Config.hasOwnProperty(key)) return null;
                return _Config[key];
            }
        };
    /*region p2p handling */
    function addPeer(peerID, nickname, icon, color, chat) {
        if (!peers.hasOwnProperty(peerID)) {
            peers[peerID] = {
                chatConn: chat,
                fileConn: null,
                nickname: nickname,
                peer: peerID,
                icon: icon,
                color: color
            };
            updatePeerList();
        }
    }
    function startP2P(nickname, color, icon, bs) {
        return new Promise(function (resolve, reject) {
            localStorage.setItem("chatBox.lastPeerConf", JSON.stringify({
                nickname: nickname,
                color: color,
                icon: icon,
            }));
            chatConf.metadata.nickname = nickname;
            chatConf.metadata.color = color;
            chatConf.metadata.icon = icon;
            chatConf.metadata.bs = bs;
            peerNick = nickname;
            // peer = new Peer({key: 'znx52etk7is8m2t9'});
            peer = new Peer('someid', {host: 'localhost', port: 9000, path: '/turn'});
            peer.nickname = nickname;
            peer.color = color;
            peer.icon = icon;
            peer.bs = bs;
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
                    addPeer(conn.peer, conn.metadata.nickname, conn.metadata.icon, conn.metadata.color, conn);
                    connectedChatPeers[conn.peer] = conn;
                    handleChatConnection(conn);
                    setTimeout(() => {
                        conn.send({
                            com: "handshake",
                            nickname: peerNick,
                            color: lastColor,
                            icon: icon,
                            bs: bs,
                        });
                        sendPeerUpdate();
                    }, 500)
                } else {
                    handleFileConnection(conn);
                }
            });
        });
    }
    function connectTo(peerID) {
        return new Promise(function (resolve, reject) {
            if (peers.hasOwnProperty(peerID)) {
                reject("already connected to " + peerID);
                return;
            }
            let con = peer.connect(peerID, chatConf);
            con.on('open', function() {
                addPeer(peerID, "", "", "", con);
                connectedChatPeers[con.peer] = con;
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
    function handleChatConnection(conn) {
        let peer = peers[conn.peer];
        conn.on('data', function(data) {
            switch (data.com) {
                case "chat":
                    playSound("message");
                    colorBing(peer.color);
                    write(peer, data.msg);
                    break;
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
                    peers[conn.peer].icon = data.icon;
                    peers[conn.peer].bs = data.bs;
                    sendPeerUpdate();
                    updatePeerList();
                    break;
                default:
                    let funcName = "on" + data.com.charAt(0).toUpperCase() + data.com.slice(1);
                    for (let widgetID in widgets) {
                        let widget = widgets[widgetID];
                        if (widget.hasOwnProperty(funcName) ) {
                            widget[funcName](data);
                        }
                    }
            }
        });
        conn.on('close', function() {
            closePeer(conn.peer);
            log("System", "chat connection closed: " + conn.peer);
        });
        log("System", "chat connection opened: " + conn.peer);
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
            log("System", "file connection closed: " + conn.peer);
        });
        log("System", "file connection opened: " + conn.peer);
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
    function nickToPeerID(nick) {
        for (let peer in peers) {
            if (peers[peer].nickname === nick) return peer;
        }
        return false;
    }
    function getPeer(peerID) {
        if(peers.hasOwnProperty(peerID)) {
            return peers[peerID];
        }
    }
    function log(...args) {
        console.log(...args);
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
    //ui
    function updatePeerList() {
        // $("<li/>", {
        //     click: function(){},
        //     id: "test", // mix ids and jQuery methods
        //     addClass: "clickable"
        // });
        let $fragment = $(document.createDocumentFragment());
        for (let peerID in peers) {
            let peer = peers[peerID];
            let $span = $(`<li style="color: ${peer.color}"><i class="fa fa-${peer.icon}"></i>${peer.nickname}</li>`)
                .data("peer", peer);
            $fragment.append($span);
        }
        $peerList.empty();
        $peerList.append($fragment);
    }
    let effectQueue = [];
    let effectRunning = false;
    function colorBing(hexCode) {
        effectQueue.push({
            type: "colorBing",
            color: hexCode
        });
        runEffect();
        // $chatBox[0].style.setProperty("--color", hexCode);
        // let rgb = hexToRgb(hexCode);
        // $chatBox[0].style.setProperty("--colorRGB", rgb.r + ", " + rgb.g + ", " + rgb.b);

    }
    function setColorRing(color) {
        if (!color) {
            let effectQueue = [];
            effectRunning = false;
            G.$chatBox.removeClass("ring");
        } else {
            effectRunning = true;
            $chatBox[0].style.setProperty("--color-bing", color);
            G.$chatBox.addClass("ring");
        }
    }
    G.UI.setColorRing = setColorRing;
    function runEffect() {
        if (effectQueue.length < 1 || effectRunning) return;
        effectRunning = true;
        let effect = effectQueue.splice(0, 1)[0];

        switch(effect.type) {
            case "colorBing":
                let restoreColor = $chatBox[0].style.getPropertyValue("--color-instruct");
                $chatBox[0].style.setProperty("--color-instruct", effect.color);
                setTimeout(() => {
                    $chatBox[0].style.setProperty("--color-instruct", restoreColor);
                    if (effectQueue.length > 0) {
                        effectRunning = false;
                        runEffect();
                    }
                },500);
                break;
            case "bla":
                break;
        }
    }
    /*endregion*/

    /*region chat */
    function write(peer, text) {
        $msgBox.prepend('<li><span class="user" style="color:'+ peer.color +'">[' + peer.nickname + '] </span>' + text + '</li>');
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
            }
        });
        write(peer, msg);
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
    }
    function sendFile(file, id = false) {
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
        lastColor = hexCode;
        let rgb = hexToRgb(hexCode);
        $color.val(hexCode);
        $chatBox[0].style.setProperty("--color", hexCode);
        $chatBox[0].style.setProperty("--colorRGB", rgb.r + ", " + rgb.g + ", " + rgb.b);
    }
    function showCode(data) {
        // $receivedCodeView.val(data.code);
        openFileWidget("code", data.language, data.code);
    }

    //audio
    let sounds = new Map();
    let channels = {};
    let audioContext = new AudioContext();
    let mainGain = audioContext.createGain();
    mainGain.connect(audioContext.destination);
    // mainGain.gain.value = 0.5;
    // gainNode.gain.setTargetAtTime(1.0, audioCtx.currentTime + 1, 0.5);
    visualizeAudioOut();
    G.audio.audioContext = audioContext;
    function loadSound(name, url) {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function() {
            audioContext.decodeAudioData(request.response, function(buffer) {
                sounds.set(name, {
                    buffer: buffer
                });
            }, () => {
                console.error("error while loading sound");
            });
        };
        request.send();
    }
    G.audio.loadSound = loadSound;

    function playSound(name) {
        if (!sounds.has(name)) throw new Error("sound not found!");
        let buffer = sounds.get(name).buffer;
        let source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(mainGain);
        source.start(0);
    }
    G.audio.playSound = playSound;

    function addAudioChannel(name) {
        if (channels.hasOwnProperty(name)) {
            throw new Error("Channel name '"+ name +"' already taken!");
        }
        let gain = audioContext.createGain();
        gain.connect(mainGain);
        let channel = {
            setGain(value) {
                // gain.gain.value = value;
                gain.gain.setTargetAtTime(1.0, audioContext.currentTime + 1, value);
            },
            connect(src) {
                if (src instanceof MediaStream) {
                    let audioEle = new Audio();
                    audioEle.srcObject = src;
                    audioEle.onloadedmetadata = function(e) {
                        audioEle.play();
                        // video.muted = true;
                    };
                    src = audioContext.createMediaStreamSource(src);
                }
                src.connect(gain);
            }
        };
        channels[name] = channel;
        return channel;
    }
    G.audio.addAudioChannel = addAudioChannel;

    function visualizeAudioOut() {
        let path;
        let visualizer = $('#audio-out-visual')[0];
        if (!visualizer) return;
        let paths = visualizer.getElementsByTagName('path');
        let mask = $('#mask', visualizer)[0];
        let analyser = audioContext.createAnalyser();

        mainGain.connect(analyser);
        analyser.fftSize = 1024;

        let frequencyArray = new Uint8Array(analyser.frequencyBinCount);
        visualizer.setAttribute('viewBox', '0 0 255 255');

        //Through the frequencyArray has a length longer than 255, there seems to be no
        //significant data after this point. Not worth visualizing.
        for (let i = 0 ; i < 255; i++) {
            path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('stroke-dasharray', '4,1');
            mask.appendChild(path);
        }
        let doDraw = function () {
            requestAnimationFrame(doDraw);
            analyser.getByteFrequencyData(frequencyArray);
            let adjustedLength;
            for (let i = 0 ; i < 255; i+=4) {
                adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
                paths[i].setAttribute('d', 'M '+ (i) +',255 l 0,-' + adjustedLength);
            }

        };
        doDraw();
    }

    //trash
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
    loadSound("message", "/snipChat/src/Message.wav");

    /*region widget handling */
    let widgets = {};
    let commands = {};
    let fileTypes = new Map();
    let openWidget = null;

    class BaseWidget {
        constructor(id) {
            this.id = id;
            this.isOpen = false;
        }
        closeView() {
            openWidget = null;
            this.isOpen = false;
        }
        openView() {
            openWidget = this.id;
            this.isOpen = true;
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
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    function templateFactory(snip, ...vars) {
        function Template(argsObj) {
            let result = "";
            for (let i = 0; i < snip.length; i++) {
                result += snip[i];
                if (i >= vars.length) continue;
                result += argsObj[vars[i]];
            }
            return result;
        }
        Template.prototype.getVars = function () {
            return vars;
        };
        return Template;
    }
    function connectPeer() {
        let nickname = $peerNick.val();
        if (!nickname || nickname === "") {
            error("Please select Nickname!");
            return;
        }
        if (!peer) {
            $peerLogin.text("Loading...");
            let bs = localStorage.getItem("browserSecret");
            if (!bs) {
                let bs = "BS" + guid();
                localStorage.setItem("browserSecret", bs);
            }
            let icon = peerSelect.getValue();
            let color = peerColor.getColor();
            startP2P(nickname, color, icon, bs).then(()=>{
                $peerLogin.text("Copy ID");
                $peerNick.val(peerID);
                $peerNick.hide();//css("width", "0px");
                $peerColor.hide();
                $peerIcon.hide();
                $chatBox[0].style.setProperty("--user-color", color);
                $peerInfo.html(`<i class="fa fa-${icon}" style=" margin: 0 5px 0 8px"></i> ${nickname}`);
                $peerInfo.show();
            });
        } else {
            //copy
            let copyText = $peerNick[0];
            /* Select the text field */
            $peerNick.show();
            copyText.select();
            /* Copy the text inside the text field */
            document.execCommand("Copy");
            $peerNick.hide();
            /* Alert the copied text */
        }
    }
    G.peerToNick = peerToNick;
    G.nickToPeerID = nickToPeerID;
    G.nickToPeerID = nickToPeerID;
    G.getPeer = getPeer;
    G.chat.write = write;
    G.chat.error = error;
    G.chat.writeWidget = writeWidget;
    //ui events
    function initUIevents() {
        $peerLogin.on('click', connectPeer);
        $connect.on('click', function(e) {
            let target = $target.val();
            if (!target || target === "") {
                write("System", "please insert target id");
                return;
            }
            if (!connectedChatPeers.hasOwnProperty(target) || !connectedChatPeers[target].open ) {
                log("System", "Connecting to: " + target);
                connectTo(target);
            } else {
                write("System", "Already connected to: " + target);
            }
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
            console.log(file)
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
            lastColor = "#";
            while(lastColor.length < 6) {
                lastColor += Math.floor(Math.max(Math.random()*255, 80)).toString(16);
            }
            localStorage.setItem("lastColor", lastColor);
        }
        setColor(lastColor);

        //prepare icon select
        for (let i = 0; i < icons.length - 331; i++) {
            $peerIcon.append($(`<option value="${icons[i]}" data-icon="${icons[i]}" data-hidden-text="${icons[i]}"></option>`));
        }

        peerSelect = new Selectr("#chatBox select.peer-icon", {
            renderSelection: myRenderFunction,
            renderOption: myRenderFunction,
            searchable: false,
            width: 50,
            customClass: 'peer-icon-select'
        });
        $peerIcon = $(".peer-icon-select", G.$chatBox);
        //last peer conf
        let lastPeerConf = JSON.parse(localStorage.getItem("chatBox.lastPeerConf"));
        if (lastPeerConf) {
            //set color/nick/icon
            $peerNick.val(lastPeerConf.nickname);
            peerColor.setColor(lastPeerConf.color);
            peerSelect.setValue(lastPeerConf.icon);
        } else {
            //set random color and icon
            let color = "#";
            while(color.length < 6) {
                color += Math.floor(Math.max(Math.random()*255, 80)).toString(16);
            }
            peerColor.setColor(color);
            peerSelect.setValue(icons[Math.floor(Math.random() * icons.length)]);
        }



        initUIevents();
        fireEvent("init", G.$chatBox);

        function myRenderFunction(option) {
            return `<i class="fa fa-${$(option).data("icon")}"></i><span>${option.innerHtml || ""}</span>`;
        }
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

    // Widget("config", function(G) {
    //
    //     // let _conf = {};
    //     this.init = () => {
    //         //load saved config
    //     };
    //     this.onCode = (data) => {};
    // });

    Widget("code", function(G) {
        let receivedCodeViewFlask;
        let codeViewFlask;
        let langSelect;
        let history = [];
        //hack push function, return last index instead of array length
        let oPush = history.push;
        history.push = (e) => {
            return oPush.call(history, e)-1;
        };
        G.codeHistory = history;

        let $codeView = $('<div class="code-view" style="min-width: 200px; height: 90px;"></div>');
        let $sendCode = $('<button class="send-code">Send Code</button>');
        let $langSelect = $('<select class="language"></select>');
        //     codeViewFlask,
        this.init = ($container) => {
            let $sendBox = $(".bottom .send", $container);
            //last language
            lastLanguage = localStorage.getItem("lastCodeLanguage");
            if (!lastLanguage) {
                lastLanguage = "javascript";
                localStorage.setItem("lastCodeLanguage", lastLanguage);
            }

            //inject html
            $sendBox.append($codeView);
            $langSelect.insertAfter($sendBox.children(".send-msg") );
            $sendCode.insertAfter($langSelect);

            for (let lang in Prism.languages) {
                if (typeof Prism.languages[lang] === "object") {
                    $langSelect.append(`<option value="${lang}">${lang}</option>`);
                }
            }
            langSelect = new Selectr("#chatBox select.language", {
                // renderSelection: myRenderFunction,
                // renderOption: myRenderFunction,
                searchable: true,
                width: 150,
            });
            langSelect.setValue(lastLanguage);
            codeViewFlask = new CodeFlask();
            codeViewFlask.run($codeView[0], { language: lastLanguage});

            //events
            $sendCode.click(function() {
                inputCode = codeViewFlask.getCode();
                let lang = langSelect.getValue();
                sendCode(lang, inputCode);
            });
            langSelect.on('selectr.select', function(option) {
                lastLanguage = langSelect.getValue();
                // let code = $codeView.val();
                codeViewFlask.run(".code-view", { language: lastLanguage});
                localStorage.setItem("lastCodeLanguage", lastLanguage);
            });
        };
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
            console.log(data);
            let codeId = G.codeHistory.push(data);
            // showCode(data);
            writeWidget("code", `<span>CODE: ${data.language}</span>`)
                .data("id", codeId);
        };
    });
    Widget("call", function(G) {
        let constraints = { audio: true, video: false };
        this.command = "call";
        this.init = function() {

            // `
            //     <svg id="visualizer-in" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            //         <defs>
            //             <mask id="mask">
            //                 <g id="maskGroup"></g>
            //             </mask>
            //             <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            //                 <stop offset="0%" style="stop-color:#ff0a0a;stop-opacity:1" />
            //                 <stop offset="20%" style="stop-color:#f1ff0a;stop-opacity:1" />
            //                 <stop offset="90%" style="stop-color:#d923b9;stop-opacity:1" />
            //                 <stop offset="100%" style="stop-color:#050d61;stop-opacity:1" />
            //             </linearGradient>
            //         </defs>
            //         <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" mask="url(#mask)"></rect>
            //     </svg>`
        };
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
                let incomingPeer = getPeer(call.peer);
                G.UI.setColorRing(incomingPeer.color);
                let audioChannel = G.audio.addAudioChannel("callin_" + call.peer);
                call.on('stream', function(stream) {
                    // visualize("in", stream);
                    // G.audio.connect(stream);
                    audioChannel.connect(stream);
                });
                new Promise(function (resolve, reject) {
                    let peer = "USER";
                    let $ele = G.chat.writeWidget("callIn", `<span>Incoming Call ${peer}</span><span class="fas fa-phone answer-call">ANSWER</span><span class="fas fa-phone reject-call">REJECT</span>`);
                    $(".answer-call", $ele).on("click", function answerCall(e) {
                        G.UI.setColorRing(false);
                        resolve();
                        $(".answer-call", $ele).off("click", answerCall);
                    });
                    $(".reject-call", $ele).on("click", function rejectCall(e) {
                        G.UI.setColorRing(false);
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
                let targetPeer = G.nickToPeerID(nick);
                if (targetPeer === false) {
                    reject("Peer does not exists!");
                    return;
                }
                navigator.mediaDevices.getUserMedia(constraints)
                    .then(function(ownStream) {
                        let call = peer.call(targetPeer, ownStream);
                        let audioChannel = G.audio.addAudioChannel("call_" + targetPeer);

                            // audioChannel.connect(ownStream);
                        call.on('stream', function(stream) {
                            console.log(stream, ownStream)
                            // visualize("out", ownStream);
                            audioChannel.connect(stream);
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


    ((not)=> {
        if (not) return;
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
    })(true);
})();