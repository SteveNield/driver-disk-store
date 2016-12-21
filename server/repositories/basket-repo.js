var database = require('./../data/database')
    Basket = require('./../models/Basket'),
    BasketItem = require('./../models/BasketItem');

module.exports.get = function(id){
  return database.getBasket(id);
}

module.exports.addSku = function(basketId, sku){
  return new Promise(function(resolve, reject){
    getOrCreateBasket(basketId)
      .then(function(basket){
        try{
          addSkuToBasket(basket, sku);
        } catch(err){
          reject(err);
        }
        database.saveBasket(basket).then(function(){
          resolve(basket);
        }, reject);
      }, reject);
  });
}

function getOrCreateBasket(basketId){
  return new Promise(function(resolve, reject){
    database.getBasket(basketId).then(function(basket){
      if(!basket){
        database.saveBasket(new Basket(basketId)).then(resolve, reject);
      } else {
        resolve(basket);
      }
    }, reject)
  })
}

function addSkuToBasket(basket, sku){
  var basketItemId = sku.product+sku.option;
  if(basketItemId in basket.items){
    basket.items[basketItemId].quantity += 1;
  } else {
    basket.items[basketItemId] = new BasketItem(basketItemId, sku.product, sku.option);
  }
}
