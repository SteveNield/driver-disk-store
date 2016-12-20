var cookies = require('cookies-js');

module.exports.add = function(key, value, options){
  cookies.set(key, value, options);
}

module.exports.get = function(key){
  return cookies.get('basket');
}

module.exports.remove = function(key){
  cookies.expire(key);
}
