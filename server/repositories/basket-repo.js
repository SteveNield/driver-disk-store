var Basket = require('./../models/basket'),
    validObjectId = require('valid-objectid');

module.exports.create = function(){
  return new Promise(function(resolve, reject){
    Basket.create({}, function(err, basket){
      if(err)
        reject(err);
      else {
        resolve(basket);
      }
    });
  })
}

module.exports.get = function(id){
  var idIsValid = validObjectId.isValid(id);
  console.log(idIsValid ? "ID is Valid" : "ID is not Valid");
  return new Promise(function(resolve, reject){
    Basket.findOne({ _id: id }, function(err, basket){
      if(err)
        reject(err);
      else {
        resolve(basket);
      }
    })
  });
}

module.exports.addSku = function(basketId, sku){
  return new Promise(function(resolve, reject){
    Basket.findOneAndUpdate({
        _id: basketId
      }, {
        $push: {
          'items': {
            product: sku.product,
            deliveryOption: sku.option
          }
        }
      }, function(err, basket){
        if(err)
          reject(err);
        else
          resolve(basket);
    })
  });
}
