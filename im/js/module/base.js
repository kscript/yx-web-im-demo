requirejs([
  'YX',
  'util',
  'global',
  'appUI',
  'emoji',
  'message',
  'session',
  'cloudMsg'
],function(
  YX,
  Util,
  global
){
  'use strict';
  /**
   * 主要业务逻辑相关
   */
  var userUID = global('userUID', Util.readCookie("uid"));
  /**
   * 实例化
   * @see module/base/js
   */
  var yunxin = global('yunXin', new YX(userUID));
})
