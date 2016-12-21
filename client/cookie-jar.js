var cookies = require('cookies-js');

module.exports.add = function(key, value){
  cookies.set(key, value, { expires: Infinity });
}

module.exports.get = function(key){
  return cookies.get('basket');
}

module.exports.remove = function(key){
  cookies.expire(key);
}
