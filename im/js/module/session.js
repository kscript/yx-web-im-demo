define([
    'YX',
    'global',
    'uiKit'
    ],
    function(
        YX,
        global,
        NIMUIKit
    ) {
/*
* 会话模块 
*/

'use strict'

YX.fn.session = function () {
   
}
/**
 * 最近联系人显示
 * @return {void}
 */
YX.fn.buildSessions = function(id) {
    var data = {
        sessions:this.cache.getSessions(),
        personSubscribes: this.cache.getPersonSubscribes()
    }
    if(!this.sessions){
        var options = {
            data:data,
            // 点击某一会话
            onclickitem:this.openChatBox.bind(this),
            // 点击用户头像
            infoprovider:this.infoProvider.bind(this),

        } 
        this.showInfo && (options.onclickavatar = this.showInfo.bind(this));
        this.sessions = new NIMUIKit.SessionList(options)
        this.sessions.inject($('#sessions').get(0))
    }else{
        this.sessions.update(data)
    }
    this.oldUnread = this.totalUnread;
    //导航上加未读示例  
    this.showUnread();
    if(this.oldUnread !== this.totalUnread){
        global('unreadUpdate') && global('unreadUpdate')(this.totalUnread);
    }
    
    this.doPoint();
    //已读回执处理
    this.markMsgRead(id)
    var $node = $(".m-unread .u-unread")
    $node.on('mouseenter', function () {
        $node.text('×')
    })
    $node.on('mouseleave', function () {
        $node.text(this.totalUnread)
    }.bind(this))
    $node.on('click', function (event) {
        this.nim.resetAllSessionUnread()
        event.preventDefault()
    }.bind(this))
}
/**
 * 删除本地会话
 * @func
 * @param {array|object} list 要删除的会话/会话组 [{scene, to}]
 */
YX.fn.deleteLocalSessions = function(list){
    if(list){
        list = list instanceof Array ? list : [list];
        for(var i = 0;i < list.length; i++){
            this.nim.deleteLocalSession({
                id: list[i].scene + '-' + list[i].to
            });
        }
    }
}
/**
 * 删除服务器上的会话
 * @func
 * @param {array|object} list 要删除的会话/会话组 [{scene, to}]
 * @param {function} done 执行删除后的回调
 */
YX.fn.deleteSessions = function(list, done){
    if(list){
        list = list instanceof Array ? list : [list];
        this.nim.deleteSessions({
            sessions: list,
            done: done
        });
    }
}
 // 导航上加未读数
YX.fn.showUnread = function () {
    var counts = $("#sessions .panel_count")
    this.totalUnread = 0
    if(counts.length!==0){
        if(this.totalUnread !=="99+"){
            for (var i = counts.length - 1; i >= 0; i--) {
                if($(counts[i]).text()==="99+"){
                    this.totalUnread = "99+"
                    break
                }
                this.totalUnread +=parseInt($(counts[i]).text(),10)
            }
        }
    }
    var $node = $(".m-unread .u-unread")
    $node.text(this.totalUnread)
    this.totalUnread?$node.removeClass("hide"):$node.addClass("hide")
}
})