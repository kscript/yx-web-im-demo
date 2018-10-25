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
  global('userUID', localStorage.getItem("uid"));
  global('uid', localStorage.getItem("uid"));
  global('token', localStorage.getItem("token"));
  global('appkey', localStorage.getItem("appkey"));
  /**
   * 主要业务逻辑相关
   */
  var userUID = global('userUID');
  /**
   * 实例化
   * @see module/base/js
   */
  global('yunXin', new YX(userUID));
})
