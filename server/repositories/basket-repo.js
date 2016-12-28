var database = require('./../data/sqlserver'),
    sql = require('seriate'),
    Basket = require('./../models/Basket'),
    BasketItem = require('./../models/BasketItem');

const selectBasket = 'SELECT BI.* FROM Basket B INNER JOIN BasketItem BI ON BI.BasketId = B.BasketId WHERE B.BasketId = @BasketId';
const insertBasket = 'INSERT INTO Basket B (Id) VALUES (@BasketId)';

function BasketIdParam(id){
  return {
    type: sql.UNIQUEIDENTIFIER,
    val: id
  }
}

function getBasket(id){
  var getBasketRows = sqlserver.execute(selectBasket, {
    BasketId: BasketIdParam(id)
  });
  return new Promise(function(resolve, reject){
    getBasketRows.then(function(basketItems){
      var basket = new Basket(id);
      basketItems.map(function(basketItem){
        basket.items.push(basketItem);
      });
      resolve(basket);
    }, reject);
  })
}

module.exports.get = function(id){
  return getBasket(id);
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
