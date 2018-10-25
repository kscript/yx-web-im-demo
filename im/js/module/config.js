define([],
  function(
  ) {
  'use strict';
  var CONFIG = {
    // host: localStorage.getItem('host') || '',
    host: '',
    // im所在的地址
    homeLink: '/main',
    // 登录地址
    loginLink: '/login',
    // 退出登录后的跳转地址
    logoutLink: '/',
    // 被踢下线后跳转的地址
    kickLink: '/kick',
    url: '',
    chatroomList: '',
    chatroomAddr: '',
    openSubscription: false
  }

  return CONFIG;
});