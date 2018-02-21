Widget("friendSystem", function(G) {
    let _friends = [];
    let $friendList = $(`<ul class="friend-list box"></ul>`);
    // friend request
    this.command = ["friends", "fr", "friendrequest"];
    /**
     * @namespace G
     * @property {object} friends
     */
    G.friends = {};
    /**
     * @memberOf G.friends
     * @returns {array} selected users
     */
    G.friends.selected = function () {
        let selection = [];
        console.log();
        $("li", $friendList).each(function(index, ele) {
            if ($(ele).hasClass("selected")) {
                selection.push($(ele).data("friend"));
            }
        });
        return selection;
    };
    this.init = function () {
        G.$chatBox.children(".bottom").prepend($friendList);
        $friendList.on("click", "li", function () {
            $(this).toggleClass("selected");
        });
        G.p2p.listenToSocket("FRIEND_REQUEST", this.socket_friendRequest);
        G.p2p.listenToSocket("FRIENDS_UPDATE", this.socket_friendsUpdate);
        G.p2p.listenToSocket("FRIEND_STATE_CHANGE", this.socket_friendsStateChange);
    };
    /**
     * @param {string} com
     * @param subCom
     * @param msg
     */
    this.onCommand = (com, subCom, msg) => {
        if (!G.authenticated) {
            G.chat.error("Friends are only for member!")
        }
        switch(com) {
            case "friend":
                //list friends
                break;
            case "friendrequest":
            case "fr":
                // send friend request
                let targetPeer = G.p2p.nickToPeerID(subCom);
                let peer = G.p2p.getPeer(targetPeer);

                G.p2p.socketSend("FRIEND_REQUEST", {
                    targetUser: subCom
                });
                // if (!peer.member) {
                //     G.chat.error(peer.nickname + " is not a member!");
                //     return;
                // }
                // peer.chatConn.send({
                //     com: "friendRequest",
                //     msg: G.user.name
                // });
                // writeWidget("code", `<span>CODE: ${language}</span>`)
                //     .data("id", codeId);
                break;
        }
    };
    this.socket_friendsUpdate = (data) => {
        console.log("update", data)
        _friends = data;
        renderList();
    };
    this.socket_friendsStateChange = (data) => {
        console.log(data)
        for (let i = 0; i < _friends.length; i++) {
            if (_friends[i].name = data.name) {
                _friends[i] = data;
                break;
            }
        }
        renderList();
    };
    this.socket_friendRequest = (data) => {
        let $widget = G.chat.writeWidget("friend-request", '<span>new friend incoming</span><div class="accept"><i class="fa fa-check"></i></div><div class="reject"><i class="fa fa-times"></i></div>');
        $(".accept", $widget).on("click", function () {
            G.p2p.socketSend("ACCEPT_FRIEND_REQUEST", {
                requestID: data.requestID
            });
        });
        $(".reject", $widget).on("click", function () {
            G.p2p.socketSend("REJECT_FRIEND_REQUEST", {
                requestID: data.requestID
            });
        });
    };
    function renderList() {
        let $list = $(document.createDocumentFragment());
        for (let i = 0; i < _friends.length; i++) {
            let friend = _friends[i];
            let stateIcon = "bed";
            let stateColor = "#666666";
            if (friend.online) {
                stateIcon = "child";
                stateColor = "#33af11";
            }
            let $ele = $(  `<li style="color: ${friend.color}; white-space: nowrap">
                                <i class="state fa fa-${stateIcon}" style="color: ${stateColor}"></i>
                                <i class="fa fa-${friend.icon}"></i>
                                <span class="name">${friend.name}</span>
                            </li>`);
            $ele.data("friend", friend);
            $list.append($ele);
        }
        let $ele = $(".bottom .friend-list", G.$chatBox);
        let scroll = $ele.scrollTop();
        $ele.empty().append($list);
        $ele.scrollTop(scroll);
    }
});