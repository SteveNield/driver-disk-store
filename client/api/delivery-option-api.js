var httpClient = require('./../../lib/http-client'),
    BasketActions = require('./../actions/basket-actions'),
    loggr = require('./../../lib/loggr'),
    config = require('./../api.conf');

module.exports.loadDeliveryOptions = function(){
  return new Promise(function(resolve, reject){
    httpClient
      .get(config.api.host+'/api/deliveryoptions')
      .then(function(options){
        BasketActions.receiveOptions(options);
        resolve();
      }, reject);
  });
}
