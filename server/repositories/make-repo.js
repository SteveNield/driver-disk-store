var database = require('./../data/database');

module.exports.get = function(){
    return new Promise(function(resolve,reject){
        database.getMakes().then(function(makes){
            resolve(makes);
        }, function(err){
            reject(err);
        })
    });
}
