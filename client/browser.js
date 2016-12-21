module.exports.redirect = function(href){
  window.location.href = href;
}

module.exports.globals = function(){
  return window.globals;
}
