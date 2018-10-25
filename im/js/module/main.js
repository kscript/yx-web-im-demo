requirejs.config({
  baseUrl: 'js/module',
  paths : {
    'main': 'main',
    'global': 'global',
    'jquery': 'jquery-1.11.3.min',
    'jqueryContextMenu': 'jquery.contextMenu.min',
    'SDK': 'NIM_Web_SDK_v5.5.0',
    'config': 'config',
    'util' : 'util',
    'base': 'base',
    'uiKit': 'uiKit',
    'YX': 'yx',
    'appUI': 'ui',
    'cache': 'cache',
    'SDKBridge': 'link',
    'message': 'message',
    'session': 'session',
    'cloudMsg': 'cloudMsg',
    'emoji':  'emoji',
    'sessionList': 'sessionList',
    'friendList': 'friendList',
    'teamList': 'teamList',
    'kitUtil': 'kitUtil'
  }
});

requirejs([
  'SDK',
  'config',
  'util',
  'global'
], function(){
  requirejs([
    'base'
  ]);
});
