var database = require('./../data/database');

module.exports.get = function(){
    return new Promise(function(resolve, reject){
        database.getOperatingSystems().then(function(operatingSystems){
            resolve(operatingSystems);
        }, function(err){
            reject(err);
        })
    });
}
