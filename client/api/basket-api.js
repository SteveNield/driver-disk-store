var httpClient = require('./../../lib/http-client'),
    cookieJar = require('./../cookie-jar'),
    CartActions = require('./../actions/cart-actions'),
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

function loadBasketData(){
  var basketId = cookieJar.get('basket');
  return new Promise(function(resolve, reject){
    if(!basketId){
      resolve();
    } else {
      get(basketId).then(function(basket){
        CartActions.receiveBasket(basket);
        resolve();
      }, function(err){
        if (err.status === 400){
          // Client has cookie containing basket ID which does not exist
          cookieJar.remove('basket');
          loggr.info('Removed redundant basket cookie');
          CartActions.receiveBasket({});
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
module.exports.get = get;
module.exports.create = create;
module.exports.loadBasketData = loadBasketData;
