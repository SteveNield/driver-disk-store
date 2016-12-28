var sqlserver = require('./../data/sqlserver');

module.exports.get = function(){
    return new Promise(function(resolve,reject){
        sqlserver.execute('SELECT * FROM Makes').then(function(makes){
            resolve(makes);
        }, function(err){
            reject(err);
        })
    });
}
