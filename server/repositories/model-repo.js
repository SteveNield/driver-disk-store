var database = require('./../data/database');

module.exports.getWithMakeId = function(makeId){
    if(!makeId){
        return Promise.reject({ message: 'MakeId not specified' });
    }

    return new Promise(function(resolve, reject){
        database.getModels(makeId).then(function(models){
            resolve(models);
        }, function(err){
            reject(err);
        });
    });
}
