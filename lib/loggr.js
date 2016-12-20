var appInsights = require('applicationinsights'),
    moment = require('moment');

module.exports.error = function(err){
  printMessageToConsole(typeof err === 'object' ? JSON.stringify(err) : err);
  if(process.env.APPINSIGHTS_INSTRUMENTATIONKEY){
      appInsights.getClient().trackException(new Error(message));
  }
}

module.exports.info = function(message){
  printMessageToConsole(message);
}

function printMessageToConsole(message){
  var messageWithDate = moment.utc(new Date()).toISOString()+' '+message;
  console.log(messageWithDate);
}
