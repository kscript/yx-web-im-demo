# yx-web-im-demo

#### 项目介绍
网易云信im

#### 安装
```npm
cnpm i
```

#### 运行
```npm
npm run run
```

#### 打包 require
```npm
npm run rjs
```

#### 在github中查看
##### 1. 使用默认的项目配置
[点击进入](https://kscript.github.io/yx-web-im-demo/im/home)
##### 2. 使用自己的项目配置
首先, 访问 https://kscript.github.io 页面  
然后, 在控制台给 localstorage 设置下 有效的uid, token, appkey属性 及 host 属性 ([im项目](https://kscript.github.io/yx-web-im-demo/im/main)所在目录) 
设置完毕, 访问 [im项目登录页](https://kscript.github.io/yx-web-im-demo/im/login) 即可查看自己的im项目

#### 简单调试
```
void requirejs(['global'], function(global){
  // 获取im实例
  var yx = global('yunXin');
  console.log(yx);
  // 发送消息
  yx.sendMessage({
    to: 'ks2017',
    text: '你好'
  });
});
```
