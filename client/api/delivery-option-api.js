var httpClient = require('./../../lib/http-client'),
    CartActions = require('./../actions/cart-actions'),
    loggr = require('./../../lib/loggr'),
    config = require('./../api.conf');

module.exports.loadDeliveryOptions = function(){
  return new Promise(function(resolve, reject){
    httpClient
      .get(config.api.host+'/api/deliveryoptions')
      .then(function(options){
        CartActions.receiveOptions(options);
        resolve();
      }, reject);
  });
}
