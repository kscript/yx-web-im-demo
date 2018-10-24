({
  baseUrl: './module',
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
  },
  shim:{
  },
  name: 'main',// 模块入口
  // optimize: 'none', //是否压缩 默认是压缩的，去掉不要就是压缩
  out: "main-built.js", // 输出压缩后的文件位置
})