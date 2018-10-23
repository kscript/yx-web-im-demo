requirejs.config({
  baseUrl: 'js/module',
  paths : {
    'main': 'main',
    'jquery': 'jquery-1.11.3.min',
    'jqueryContextMenu': 'jquery.contextMenu.min',
    'SDK': 'NIM_Web_SDK_v5.5.0',
    'config': 'config',
    'util' : 'util',
    'base': 'base',
    'uiKit': 'uiKit.min',
    'YX': 'yx',
    'appUI': 'ui',
    'cache': 'cache',
    'SDKBridge': 'link',
    'message': 'message',
    'session': 'session',
    'cloudMsg': 'cloudMsg',
    'emoji':  'emoji'
  }
});
requirejs([
  'jquery'
], function(){
  requirejs([
    'SDK',
    'config',
    'util',
  ], function(CONFIG){
    window.CONFIG = CONFIG;
    requirejs([
      'base'
    ])
  
  })
})