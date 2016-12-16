var database = require('./../data/database'),
    currencyFormatter = require('./../../lib/currency-formatter');

module.exports.get = function(make, model, operatingSystem){
    if(!make){
        return Promise.reject({ message: 'Make is missing' });
    }

    if(!model){
        return Promise.reject({ message: 'Model is missing' });
    }

    if(!operatingSystem){
        return Promise.reject({ message: 'Operating system is missing' });
    }

    return new Promise(function(resolve, reject){
      try{
        database.getProduct(make, model, operatingSystem).then(function(product){
            if(!product){
                reject(new Err('Specified product does not exist'));
            }
            resolve(product);
        }, function(err){
            reject(err);
        });
      } catch(err){
        reject(err);
      }
    });
}
