var httpClient = require('./../../lib/http-client'),
    cookieJar = require('./../cookie-jar'),
    BasketActions = require('./../actions/basket-actions'),
    loggr = require('./../../lib/loggr'),
    config = require('./../api.conf');

function addSku(basketId, sku){
  return httpClient.put(
    '/api/basket/'+basketId+'/items',
    sku
  );
}

function get(basketId){
  return httpClient.get('/api/basket/'+basketId);
}

function create(){
  return httpClient.put('/api/basket');
}

function removeItem(basketId, basketItemId){
  return httpClient.delete('/api/basket/'+basketId+'/items/'+basketItemId);
}

function loadBasketData(){
  var basketId = cookieJar.get('basket');
  return new Promise(function(resolve, reject){
    if(!basketId){
      resolve();
    } else {
      get(basketId).then(function(basket){
        BasketActions.receiveBasket(basket);
        resolve();
      }, function(err){
        if (err.status === 404){
          // Client has cookie containing basket ID which does not exist
          cookieJar.remove('basket');
          loggr.info('Removed redundant basket cookie');
          BasketActions.receiveBasket({});
          resolve();
        } else {
          loggr.error(err);
          reject(err);
        }
      })
    }
  })
}

module.exports.addSku = addSku;
module.exports.removeItem = removeItem;
module.exports.get = get;
module.exports.create = create;
module.exports.loadBasketData = loadBasketData;
