var driverApiClient = require('./../data/driver-api-client');

module.exports.get = function(){
    return new Promise(function(resolve, reject){
        driverApiClient.get('/operatingsystems').then(function(operatingSystems){
            resolve(operatingSystems);
        }, function(err){
            reject(err);
        }) 
    });
}