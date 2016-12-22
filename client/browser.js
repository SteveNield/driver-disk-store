module.exports.redirect = function(href){
  window.location.href = href;
}

module.exports.globals = function(){
  return window.globals;
}

module.exports.getLocation = function(){
  return window.location.protocol+'://'+window.location.host;
}
