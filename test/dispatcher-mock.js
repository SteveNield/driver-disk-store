var callback;

module.exports.register = function(cb){
  callback = cb;
}

module.exports.handleAction = function(payload){
  callback(payload);
}
