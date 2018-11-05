requirejs([
  'YX',
  'global',
  'appUI',
  'emoji',
  'message',
  'session',
  'cloudMsg'
],function(
  YX,
  global
){
  'use strict';
  global('baseUrl', localStorage.getItem("baseUrl"));
  global('userUID', localStorage.getItem("uid"));
  global('uid', localStorage.getItem("uid"));
  global('token', localStorage.getItem("token"));
  global('appkey', localStorage.getItem("appkey"));
  $("#sessionsWrap .btn-chat1").html('<i class="icon icon-linkman"></i>最近联系人<i class="icon icon-down">')
  $("#showEmoji").after('<a class="chat-btn u-link" id="sendInfo"></a><a class="chat-btn u-black" id="addToBlack"></a>');
  
  /**
   * 主要业务逻辑相关
   */
  var userUID = global('userUID');
  /**
   * 实例化
   * @see module/base/js
   */
  var yunXin = new YX(userUID);
  global('yunXin', yunXin);
})
