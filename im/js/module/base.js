requirejs([
  'YX',
  'appUI',
  'emoji',
  'util',
  'message',
  'session',
  'cloudMsg'
],function(
  YX,
  appUI,
  emoji,
  Util
){
  'use strict';
  window.appUI = appUI;
  for(var key in emoji){
    if(emoji.hasOwnProperty(key)){
      window[key] = emoji[key];
    }
  }
  
  /**
   * 主要业务逻辑相关
   */
  window.userUID = Util.readCookie("uid")
  /**
   * 实例化
   * @see module/base/js
   */
  var yunXin = new YX(userUID);
})
