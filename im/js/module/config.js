define([],
  function() {
  'use strict';
  var CONFIG = {
    // im所在的地址
    homeLink: '/',
    // 登录地址
    loginLink: '/login',
    // 退出登录后的跳转地址
    logoutLink: '/',
    // 被踢下线后跳转的地址
    kickLink: '/kick',

    // 这里的 uid 和 token 只在测试时使用
    // 线上应在后台获取并设置为cookie
    uid: localStorage.getItem('uid') || 'test2017',
    token: localStorage.getItem('token') || '0f2ce291c76ecfc032e3432142f06fac',
    appkey: localStorage.getItem('appkey') || '45c6af3c98409b18a84451215d0bdd6e',
    url: '',
    chatroomList: '',
    chatroomAddr: '',
    openSubscription: false
  }
  return CONFIG;
});