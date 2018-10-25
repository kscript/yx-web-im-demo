define([], function() {
  'use strict';
  var scope = {}
  return function(key, val){
    var len = arguments.length;
    if(len && typeof key !== 'string'){
      throw new TypeError('key');
      return ;
    }
    return len > 1 ? (scope[key] = val) : len === 1 ? scope[key] : scope;
  }
});