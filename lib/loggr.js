var appInsights = require('applicationinsights'),
    moment = require('moment');

module.exports.error = function(err){
    var message = moment.utc(new Date()).toISOString()+' '+typeof err === 'object' ? JSON.stringify(err) : err;
    console.log(message);
    if(process.env.APPINSIGHTS_INSTRUMENTATIONKEY){
        appInsights.getClient().trackException(new Error(message));
    }
}