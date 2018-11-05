define([
  'util',
  'global'
],
  function(
    Util,
    global
  ) {
  var appUI = {
    /**
     * 当前会话聊天面板UI
     */
    buildChatContentUI: function(id, cache) {
      var current = global('yunXin').crtSessionAccount;

      var msgHtml = '<div class="load-more"><a class="j-loadMore">获取更多消息</a></div>',
        msgs = cache.getMsgs(id);
      if (msgs.length === 0) {
        msgHtml =
          '<div class="no-msg tc"><span class="radius5px">暂无消息</span></div>';
      } else {
        for (var i = 0, l = msgs.length; i < l; ++i) {
          var message = msgs[i],
            user = cache.getUserById(message.from);
            var type = {in: 'from', out: 'to'}[message.flow];
            if(message[type] !== current){
              continue;
            }
          if (
            message.attach &&
            message.attach.netcallType !== undefined &&
            (message.attach.type !== 'netcallBill' &&
              message.attach.type !== 'netcallMiss')
          ) {
            // 隐藏掉netcall相关的系统消息
            continue;
          }
          //消息时间显示
          if (i == 0) {
            // msgHtml += '<a class="j-loadMore">加载更多记录</a>';
            msgHtml += this.makeTimeTag(Util.transTime(message.time));
          } else {
            if (message.time - msgs[i - 1].time > 5 * 60 * 1000) {
              msgHtml += this.makeTimeTag(Util.transTime(message.time));
            }
          }
          msgHtml += this.makeChatContent(message, user);
        }
      }
      return msgHtml;
    },

    /**
     * 更新当前会话聊天面板UI
     */
    updateChatContentUI: function(msg, cache) {
      var current = global('yunXin').crtSessionAccount;
      var lastItem = $('#chatContent .item').last(),
        msgHtml = '',
        user = cache.getUserById(msg.from);
      var message = msg;
      var type = {in: 'from', out: 'to'}[message.flow];
      if(message[type] !== current){
        return '';
      }
      if (
        message.attach &&
        message.attach.netcallType !== undefined &&
        (message.attach.type !== 'netcallBill' &&
          message.attach.type !== 'netcallMiss')
      )
        return ''; // 隐藏掉netcall相关的系统消息
      // 白板互动结束后会收到的互动时长通知，demo中暂不需要，屏蔽
      if (
        message.type === 'notification' &&
        (message.attach.type === 201 || message.attach.type === 202)
      )
        return '';
      if (lastItem.length == 0) {
        msgHtml += this.makeTimeTag(Util.transTime(msg.time));
      } else {
        if (msg.time - parseInt(lastItem.attr('data-time')) > 5 * 60 * 1000) {
          msgHtml += this.makeTimeTag(Util.transTime(msg.time));
        }
      }
      msgHtml += this.makeChatContent(msg, user);
      return msgHtml;
    },
    randerCustomContent: function(message, content, user){

      var avatar = user.avatar;
      var from = message.from;
      var showNick = from !== global('userUID');
      var res = [];
      var texts = [];
      if(content.text){
        content.text = content.text instanceof Array ? content.text : [content.text];
        for(var t = 0; t < content.text.length; t++){
          texts.push('<div class="content-text">' + content.text[t] + '</div>');
        }
      }
      switch (content.type) {
        case 5:
          res = [
            '<div data-time="' +
              message.time +
              '" data-id="' +
              message.idClient +
              '" id="' +
              message.idClient +
              '" data-idServer="' +
              message.idServer +
              '" class="item item-custom' +
            '">',
              '<img class="img j-img" src="' +
              Util.getAvatar(avatar) +
              '" data-account="' +
              from +
              '"/>',
              '<div class="msg msg-text">',
                '<div class="box">',
                  '<span class="readMsg"><i></i>已读</span>',
                  '<div class="cnt">',
                    Util.getMessage(message),
                  '</div>',
                '</div>',
              '</div>',
            '</div>'
          ]
          break;
        case 6:
          res = [
            '<div data-time="' +
              message.time +
              '" data-id="' +
              message.idClient +
              '" id="' +
              message.idClient +
              '" data-idServer="' +
              message.idServer +
              '" class="item custom-pic-text item-' + Util.buildSender(message) + 
            '">',
              '<img class="img j-img" src="' +
              Util.getAvatar(avatar) +
              '" data-account="' +
              from +
              '"/>',
              showNick ? '<p class="nick">' + Util.getNick(from) + '</p>' : '',
              '<div class="msg msg-text">',
                '<a class="link" href="' + content.link + '" target="_blank">',
                '<div class="box">',
                  '<span class="readMsg"><i></i>已读</span>',
                  '<div class="cnt">',
                  '<div class="media-box">',
                    '<h4>' + content.title +'</h4>',
                    '<img class="pic" src="' + content.pic + '">',
                    texts.join(''),
                    '</div>',
                  '</div>',
                '</div>',
                '</a>',
              '</div>',
            '</div>'
          ]
        default: break;
      }
      return res.join('');
    },
    /**
     * 通用消息内容UI
     */
    makeChatContent: function(message, user) {
      var msgHtml;
      // 如果不是当前聊天的账号
      // if(message.to !== global('yunXin').crtSessionAccount){
      //   return '';
      // }
      //通知类消息
      if (
        message.attach &&
        message.attach.type &&
        (message.attach.netcallType === undefined ||
          (message.attach.type !== 'netcallBill' &&
            message.attach.type !== 'netcallMiss'))
      ) {
        if (message.attach.netcallType !== undefined) return ''; // 隐藏掉netcall相关的系统通知消息
        // 白板互动结束后会收到的互动时长通知，会触发聊天框的新增，屏蔽
        if (
          message.type === 'notification' &&
          (message.attach.type === 201 || message.attach.type === 202)
        )
          return '';
        var notificationText = Util.transNotification(message);
        msgHtml =
          '<p class="u-notice tc item" data-time="' +
          message.time +
          '" data-id="' +
          message.idClient +
          '" data-idServer="' +
          message.idServer +
          '"><span class="radius5px">' +
          notificationText +
          '</span></p>';
      } else {
        // 使用自定义模板
        var custom = false;
        var content = {};
        //聊天消息
        var type = message.type,
          from = message.from,
          avatar = user.avatar,
          showNick = from !== global('userUID'), // message.scene === 'team' && from !== global('userUID'),
          msgHtml;
        if (type === 'tip') {
          msgHtml = [
            '<div data-time="' +
              message.time +
              '" data-id="' +
              message.idClient +
              '" id="' +
              message.idClient +
              '" data-idServer="' +
              message.idServer +
              '">',
            '<p class="u-notice tc item ' +
              (from == global('userUID') && message.idServer ? 'j-msgTip' : '') +
              '" data-time="' +
              message.time +
              '" data-id="' +
              message.idClient +
              '" data-idServer="' +
              message.idServer +
              '"><span class="radius5px">' +
              Util.getMessage(message) +
              '</span></p>',
            '</div>'
          ].join('');
        } else {
          if(type === 'custom'){
            try{
              content = JSON.parse(message.content);
              // 4以上使用自定义模板
              custom = content.type > 4;
            }catch(e){
              console.log(e);
            }
            content = content || {};
          }
          if(custom){
            msgHtml = this.randerCustomContent(message, content, user);
          } else {
            msgHtml = [
              '<div data-time="' +
                message.time +
                '" data-id="' +
                message.idClient +
                '" id="' +
                message.idClient +
                '" data-idServer="' +
                message.idServer +
                '" class="item item-' +
                Util.buildSender(message) +
                '">',
              '<img class="img j-img" src="' +
                Util.getAvatar(avatar) +
                '" data-account="' +
                from +
                '"/>',
              showNick ? '<p class="nick">' + Util.getNick(from) + '</p>' : '',
              '<div class="msg msg-text j-msg">',
              '<div class="box">',
              '<span class="readMsg"><i></i>已读</span>',
              '<div class="cnt">',
              Util.getMessage(message),
              '</div>',
              '</div>',
              '</div>'
            ];
            if (message.blacked) {
              msgHtml.push(
                '<span class="error" data-session="' +
                  message.sessionId +
                  '" data-id="' +
                  message.idClient +
                  '"><i class="icon icon-error"></i>发送失败,已被拉黑</span>'
              );
            } else if (message.status === 'fail') {
              msgHtml.push(
                '<span class="error j-resend" data-session="' +
                  message.sessionId +
                  '" data-id="' +
                  message.idClient +
                  '"><i class="icon icon-error"></i>发送失败,点击重发</span>'
              );
            } else {
              msgHtml.push('');
            }
            // 群组已读部分代码
            // if (
            //   message.scene === 'team' &&
            //   message.needMsgReceipt &&
            //   message.idServer &&
            //   message.flow === 'out'
            // ) {
            //   if (+message.teamMsgUnread === 0) {
            //     msgHtml = msgHtml.concat([
            //       '<span class="readTeamMsg"><i></i>全部已读</span>'
            //     ]);
            //   } else if (+message.teamMsgUnread > 0) {
            //     msgHtml = msgHtml.concat([
            //       '<span class="readTeamMsg"><i></i>' +
            //         message.teamMsgUnread +
            //         '人未读</span>'
            //     ]);
            //   }
            // }
            msgHtml = msgHtml.concat([
              '</div>'
            ]);
            msgHtml = msgHtml.join('');
          }
        }
      }
      return msgHtml;
    },

    /**
     * 云记录面板UI
     */
    buildCloudMsgUI: function(msg, cache) {
      var msgHtml = '',
        len = msg.length,
        meessage;
        
      var current = global('yunXin').crtSessionAccount;
      for (var i = len - 1; i >= 0; --i) {
        message = msg[i];
        var type = {in: 'from', out: 'to'}[message.flow];
        if(message[type] !== current){
          continue;
        }
        if (i == len - 1) {
          msgHtml += this.makeTimeTag(Util.transTime(message.time));
        } else {
          if (message.time - msg[i + 1].time > 5 * 60 * 1000) {
            msgHtml += this.makeTimeTag(Util.transTime(message.time));
          }
        }
        msgHtml += this.makeChatContent(message, cache.getUserById(message.from));
      }
      return msgHtml;
    },

    /**
     * 群成员列表
     */
    buildteamMemberUI: function(list) {
      list.nick = Util.getNick(list.account);
      list.nick = list.nick === list.account ? '' : list.nick;
      return [
        '<li data-icon="' +
          list.avatar +
          '" data-account="' +
          list.account +
          '" data-nick="' +
          (list.nick || list.name || list.account) +
          '">',
        '<i class="icon icon-radio"></i>',
        '<img src="' + Util.getAvatar(list.avatar) + '">',
        '<span class="name">' +
          (list.nick || list.name || list.account) +
          '</span>',
        '</li>'
      ].join('');
    },

    /**
     * 黑名单
     */
    buildBlacklist: function(data, cache) {
      var html = '';
      if (data.length === 0) {
        return '';
      }
      for (var i = 0; i < data.length; i++) {
        var user = cache.getUserById(data[i].account);
        html += [
          '<li class="items f-cb">',
          '<img src="' + Util.getAvatar(user.avatar) + '" class="head">',
          '<span class="nick">' + user.nick + '</span>',
          '<button class="btn radius4px btn-ok j-rm" data-id="' +
            user.account +
            '">解除</button>',
          '</li>'
        ].join('');
      }
      return html;
    },

    /**
     * 系统消息
     */
    buildSysMsgs: function(data, cache) {
      var html = '',
        item,
        team,
        action,
        content;
      if (data.length === 0) {
        return '';
      }
      for (var i = 0; i < data.length; i++) {
        item = data[i];
        if (item.category == 'team') {
          team = item.attach ? item.attach.team : cache.getTeamMapById(item.to);
          //拿不到群信息就过滤吧
          if (!team) {
            continue;
          }
          if (item.type === 'teamInvite') {
            content = Util.getNick(item.from) + '邀请你入群';
            if (item.state === 'init') {
              action = '<a class="j-apply">同意</a><a class="j-reject">拒绝</a>';
            } else if (item.state === 'rejected') {
              action = '已拒绝';
            } else if (item.state === 'passed') {
              action = '已同意';
            } else {
              action = '已失效';
            }
          } else if (item.type === 'applyTeam') {
            content = Util.getNick(item.from) + '申请加入群';
            if (item.state === 'init') {
              action = '<a class="j-apply">同意</a><a class="j-reject">拒绝</a>';
            } else if (item.state === 'rejected') {
              action = '已拒绝';
            } else if (item.state === 'passed') {
              action = '已同意';
            } else {
              action = '已失效';
            }
          } else if (
            item.type === 'rejectTeamApply' ||
            item.type === 'rejectTeamInvite'
          ) {
            content = Util.getNick(item.from) + '拒绝了你的入群邀请';
            action = '已拒绝';
          } else {
            content = '未知';
            action = '';
          }
          html += [
            '<div class="item">',
            '<img src="' + global('baseUrl') + 'images/advanced.png">',
            '<div class="text">',
            '<p><span>' +
              (team ? team.name : item.to) +
              '</span><b class="time">' +
              Util.transTime2(item.time) +
              '</b></p>',
            '<p><span class="first-msg">' +
              content +
              '</span><b class="action" data-type="' +
              item.type +
              '" data-idServer="' +
              item.idServer +
              '" data-id="' +
              team.teamId +
              '" data-from="' +
              item.from +
              '">' +
              action +
              '</b></p>',
            '</div>',
            '</div>'
          ].join('');
        } else if (item.category == 'friend') {
          //处理好友的系统通知
          //本demo为了方便演示默认加好友直接通过，好友的系统通知不处理
        }
      }
      return html;
    },
    // 自定义系统通知
    buildCustomSysMsgs: function(data, cache) {
      var html = '',
        content,
        from,
        scene,
        to,
        nick,
        avatar;
      if (data.length === 0) {
        return html;
      }
      data = data.sort(function(a, b) {
        return b.time - a.time;
      });
      for (var i = 0; i < data.length; i++) {
        scene = data[i].scene;
        content = JSON.parse(data[i].content).content;
        from = data[i].from;
        to = data[i].to;
        if (scene === 'p2p') {
          nick = Util.getNick(from);
          avatar = Util.getAvatar(
            cache.getUserById(from) ? cache.getUserById(from).avatar : ''
          );
        } else {
          var teamInfo = cache.getTeamById(to + '');
          if (teamInfo) {
            nick = teamInfo.name + '-->' + Util.getNick(from);
            avatar = global('baseUrl') + 'images/' + teamInfo.type + '.png';
          } else {
            nick = to + '-->' + Util.getNick(from);
            avatar = global('baseUrl') + 'images/normal.png';
          }
        }
        html += [
          '<div class="item">',
          '<img src="' + avatar + '">',
          '<div class="text">',
          '<p><span>' +
            nick +
            '</span><b class="time">' +
            Util.transTime2(data[i].time) +
            '</b></p>',
          '<p><span class="first-msg">' + content + '</span></p>',
          '</div>',
          '</div>'
        ].join('');
      }
      return html;
    },
    //聊天消息中的时间显示
    makeTimeTag: function(time) {
      return '<p class="u-msgTime">' + time + '</p>';
    },
    // 多人音视频列表
    buildmeetingMemberUI: function(data) {
      // data.nick = Util.getNick(data.account);
      data.avatar = Util.getAvatar(data.avatar);
      data.avatar = /default-icon\.png/gi.test(data.avatar) ? '' : data.avatar;
      return (
        '<li class="item loading" style="' +
        (data.avatar ? 'background-image:url(' + data.avatar + ')' : '') +
        '" data-account=' +
        data.account +
        '>' +
        '<span class="fullScreenIcon" title="切换全屏">&nbsp;</span>' +
        '<span class="tip"><i></i><i></i><i></i></span>' +
        '<p class="name" data-account="' +
        data.account +
        '">' +
        data.nick +
        '</p>' +
        '<p class="volume-show" style="width:0"></p>' +
        '</li>'
      );
    },
    // 多人禁言ui
    buildspeakBanUI: function(data) {
      data.nick = Util.getNick(data.account);
      data.nick = data.nick === data.account ? '' : data.nick;
      return (
        '<li data-icon="' +
        data.avatar +
        '" data-account="' +
        data.account +
        '" data-nick="' +
        (data.nick || data.name || data.account) +
        '">' +
        '<i class="icon-control icon-micro"></i>' +
        '<img src="' +
        Util.getAvatar(data.avatar) +
        '">' +
        '<span class="name">' +
        (data.nick || data.name || data.account) +
        '</span>' +
        '</li>'
      );
    }
  };
  return appUI;
})