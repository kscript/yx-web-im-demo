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
  'jquery'
], function($){
  $("#nim .j-btn-chat").on("click", function(){
    $("#rightPanel,#chatVernier").addClass("hide");
    $("#nim").toggleClass("mini");
  });
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