var driverApiClient = require('./../data/driver-api-client');

module.exports.get = function(){
    return new Promise(function(resolve,reject){
        driverApiClient.get('/makes').then(function(makes){
            resolve(makes);
        }, function(err){
            reject(err);
        }) 
    });
}