var database = require('./../data/database');

module.exports.get = function(id){
  return database.getBasket(id);
}

module.exports.addItem = function(basketId, sku){
  return new Promise(function(resolve, reject){
    database.getBasket(basketId).then(function(basket){
      addSkuToBasket(basket, sku);
      database.saveBasket(basket).then(function(){
        resolve(basket);
      }, reject);
    }, reject);
  });
}

function findBasketItemForSku(basket, sku){
  return basket.items.find(function(item){
    return (item.sku.product === sku.product && item.sku.option === sku.option);
  })
}

function addSkuToBasket(basket, sku){
  var existingItem = findBasketItemForSku(basket, sku);
  if (existingItem){
    existingItem.quantity += 1;
  } else {
    basket.items.push(constructBasketItem(sku));
  }
}

function constructBasketItem(sku){
  return {
    quantity: 1,
    sku: sku
  }
}
