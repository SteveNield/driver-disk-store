var driverApiClient = require('./../data/driver-api-client'),
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
        driverApiClient.get('/products/'+make+'/'+model+'/'+operatingSystem, {
            make: make, model: model, operatingSystem: operatingSystem
        }).then(function(product){
            if(!product){
                reject({status:404, message:'Specified product does not exist'});
            }
            
            product.displayPrice = currencyFormatter.format('GBP', product.price);
            resolve(product);
        }, function(err){
            reject(err);
        });
    });
}