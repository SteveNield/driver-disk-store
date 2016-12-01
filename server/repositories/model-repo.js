var driverApiClient = require('./../data/driver-api-client');

module.exports.getWithMakeId = function(makeId){
    if(!makeId){
        return Promise.reject({ message: 'MakeId not specified' });
    }
    
    return new Promise(function(resolve, reject){
        driverApiClient.get('/makes/'+makeId+'/models', { makeId: makeId }).then(function(models){
            resolve(models); 
        }, function(err){
            reject(err);
        });
    });
}