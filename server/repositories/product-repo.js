var Product = require('./../models/Product');

module.exports.get = function(make, model, operatingSystem){
  return new Promise(function(resolve, reject){
    Product.findOne({
      make: make,
      model: model,
      operatingSystem: operatingSystem
    }, function(err, product){
      if(err){
        reject(err);
      } else {
        resolve(product);
      }
    });
  })
}

module.exports.getMakes = function(){
  return new Promise(function(resolve, reject){
    Product.distinct("make", function(err, makes){
      if(err)
        reject(err);
      else
        resolve(makes);
    });
  })
}

module.exports.getModelsForMake = function(make){
  return new Promise(function(resolve, reject){
    Product.find({
      make: make
    }, function(err, products){
      if(err){
        reject(err);
      } else {
        resolve(
          products.map(function(product){
            return product.model;
          }).filter(function(model, index, self){
            return self.indexOf(model) === index;
          })
        )
      }
    })
  });
}

module.exports.getOperatingSystems = function(){
  return new Promise(function(resolve, reject){
    Product.distinct("operatingSystem", function(err, operatingSystems){
      if(err)
        reject(err);
      else
        resolve(operatingSystems);
    });
  });
}
