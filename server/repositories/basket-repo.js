var Basket = require('./../models/basket'),
    productRepo = require('./product-repo'),
    deliveryOptionRepo = require('./delivery-option-repo'),
    mongoose = require('mongoose');

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
  return new Promise(function(resolve, reject){
    Basket
      .findOne({ _id: id })
      .populate('items.product')
      .populate('items.deliveryOption')
      .exec(function(err, basket){
        if(err){
          reject(err);
        } else {
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

module.exports.removeItem = function(basketId, basketItemId){
  return new Promise(function(resolve, reject){
    Basket.findOneAndUpdate({
      _id: basketId
    }, {
      $pull: {
        'items': {
          _id: basketItemId
        }
      }
    }, function(err, basket){
      if(err)
        reject(err);
      else {
        resolve(basket);
      }
    })
  });
}
