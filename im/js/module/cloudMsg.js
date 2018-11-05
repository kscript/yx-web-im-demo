requirejs([
    'YX',
    'appUI'
],
function(
    YX,
    appUI
    ) {
/*
* 云记录
*/

'use strict'

YX.fn.cloudMsg = function () {
	this.$cloudMsg = $('#cloudMsg')
	this.$cloudMsgContainer = $('#cloudMsgContainer')
 	this.$cloudMsg.on('click', this.showCloudMsg.bind(this, this.$cloudMsg));
    this.$cloudMsgContainer.delegate('.j-backBtn', 'click', this.closeCloudMsgContainer.bind(this));
    this.$cloudMsgContainer.delegate('.j-loadMore', 'click', this.loadMoreCloudMsg.bind(this))
    this.$cloudMsgContainer.delegate('.j-mbox','click',this.playAudio)
}
/**
 * 查看云记录
 */
YX.fn.showCloudMsg = function ($cloudMsg, event, isNative) {
    if(!isNative) {
        $('#rightPanel, #cloudMsgContainer').addClass('hide');
        return;
    }
    var that = this
    // this.$cloudMsgContainer.load('./cloudMsg.html', function() {
        that.$cloudMsgContainer.removeClass('hide');
        // 如果云记录显示的是与当前账号的记录, 那么什么都不必做
        if(that.$cloudMsgContainer.data("account") === this.crtSessionAccount){
            // return ;
        } else {
            $("#cloudMsgList").html("");
        }
        that.$cloudMsgContainer.data("account", this.crtSessionAccount);
        var id = that.crtSessionAccount,
            scene = that.crtSessionType,
            param ={
                scene:scene,
                to:id,
                lastMsgId:0,
                limit:20,
                reverse:false,
                done: function(error, obj, msgs){
                    // 添加一个 是否为加载更多 的参数
                    that.cbCloudMsg(error, obj, msgs, false);
                }
            }
        that.mysdk.getHistoryMsgs(param)

        /** 通话中的设置 */
		var tmp = that.myNetcall;
		tmp && tmp.$goNetcall.toggleClass("hide", !tmp.netcallActive);
    // })
}
YX.fn.closeCloudMsgContainer = function () {
    this.$cloudMsgContainer.addClass('hide')
    /** 通话中的设置 */
	var tmp = this.myNetcall;
	tmp && tmp.$goNetcall.toggleClass("hide", true);
},

/**
 * 加载更多云记录
 */
YX.fn.loadMoreCloudMsg = function (event, selector, tip) {
    selector = selector || "#cloudMsgList";
    var that = this;
    var id = this.crtSessionAccount,
        scene = this.crtSessionType,
        lastItem = $(".item", selector).first(),
        param ={
            scene:scene,
            to:id,
            beginTime:0,
            endTime:parseInt(lastItem.attr('data-time')),
            lastMsgId:parseInt(lastItem.attr('data-idServer')),//idServer 服务器用于区分消息用的ID，主要用于获取历史消息
            limit:20,
            reverse:false,
            done: function(error, obj, msgs){
                // 添加一个 是否为加载更多 的参数
                that.cbCloudMsg(error, obj, msgs, true, selector, tip);
            }
        }
    this.mysdk.getHistoryMsgs(param)
}

/**
 * 云记录获取回调
 * @param  {boolean} error 
 * @param  {object} obj 云记录对象
 * @param  {boolean} isMore 点击 云记录 按钮
 * 
 * @param {string|jQuerySelector} selector 扩展参数1: 聊天记录容器
 * @param {string|jQuerySelector} tip 扩展参数2: 加载更多标签
 * @todo 扩展参数为可选项, 不传时, 不改变函数功能
 */
YX.fn.cbCloudMsg = function (error, obj, msgs, isMore, selector, tip) {
    var isExpand = selector && tip;
    selector = selector || "#cloudMsgList";
    tip = tip || "#cloudMsgContainer .u-status span";
    var $node = $(selector);
    var $tip = $(tip);

    var $scrollEl = isExpand ? $node : $node.parent();
    var currentTop = $scrollEl.scrollTop();
    var scrollHeight = getHeight();

    if (!error) {
        if (obj.msgs.length === 0) {
            $tip.addClass('isComplete').html('没有更早的聊天记录');
        } else {
            if(obj.msgs.length<20){
                 $tip.addClass('isComplete').html('没有更早的聊天记录') 
            }else{
                 $tip.removeClass('isComplete').html('<a class="j-loadMore">加载更多记录</a>')
            }
            var msgHtml = appUI.buildCloudMsgUI(obj.msgs,this.cache);
            if(isMore){
                $(msgHtml).prependTo($node);
                $scrollEl.scrollTop(getHeight() - scrollHeight + currentTop);
            } else {
                $node.html(msgHtml);
                $scrollEl.scrollTop(getHeight());
            }
        }
    } else {
        console && console.error('获取历史消息失败')
        $tip.html('获取历史消息失败') 
    }
    // 云信聊天记录结构不一致, 使用扩展的方式时, 获取高度需要用scrollHeight (滚动容器在元素自身)
    function getHeight(){
        return isExpand ? $scrollEl.prop('scrollHeight') : $node.height();
    }
}
})