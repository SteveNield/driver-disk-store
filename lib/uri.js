module.exports.decodeArgument = function(arg){
  return arg.replace(/\+/, ' ');
}

module.exports.encodeArgument = function(arg){
  return arg.replace(/\s/, '+');
}
