var currencyFormatter = require('./../../lib/currency-formatter'),
    data = require('./data.json');

module.exports.getProduct = function(make, model, operatingSystem){
  return new Promise(function(resolve, reject){
    try{
      var product = data.products.find(function(product){
        if (product.make === make &&
            product.model === model &&
            product.operatingSystem === operatingSystem)
            return true;
        else
            return false;
      });
      product.options = data.options.filter(function(option){
        if (product.optionIds.indexOf(option.id) !== -1){
          return true;
        } else {
          return false;
        }
      });
      resolve(product);
    } catch(err){
      reject(err);
    }
  });
}

module.exports.getMakes = function(){
  return Promise.resolve(data.makes);
}

module.exports.getModels = function(makeId){
  return Promise.resolve(data.models.filter(function(model){
      return model.makeId === makeId;
  }));
}

module.exports.getOperatingSystems = function(){
  return Promise.resolve(data.operatingSystems);
}

module.exports.saveBasket = function(basket){
  return new Promise(function(resolve, reject){
    data.baskets[basket.id] = basket;
    console.log(JSON.stringify(data.baskets));
    resolve();
  });
}

module.exports.getBasket = function(id){
  return new Promise(function(resolve, reject){
    var basket = data.baskets[id];
    if(!basket){
      reject({
        status: 400,
        message: 'Basket not found'
      })
    } else {
      resolve(basket);
    }
  })
}
