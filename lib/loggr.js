var appInsights = require('applicationinsights'),
    moment = require('moment');

module.exports.error = function(err){
  var debugInformation = err.stack;
  printMessageToConsole(debugInformation);
  if(process.env.APPINSIGHTS_INSTRUMENTATIONKEY){
      appInsights.getClient().trackException(new Error(debugInformation));
  }
}

module.exports.info = function(message){
  printMessageToConsole(message);
}

function printMessageToConsole(message){
  var messageWithDate = moment.utc(new Date()).toISOString()+' '+message;
  console.log(messageWithDate);
}
