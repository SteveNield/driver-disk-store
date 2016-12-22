var httpClient = require('./../../lib/http-client'),
    config = require('./../api.conf'),
    ProductSearchActions = require('./../actions/product-search-actions');

module.exports.loadMakes = function(){
  return new Promise(function(resolve, reject){
    httpClient
      .get(config.api.host+'/api/makes')
      .then(function(makes){
        ProductSearchActions.receiveMakes(makes);
        resolve();
      }, reject);
  });
}

module.exports.loadOperatingSystems = function(){
  return new Promise(function(resolve, reject){
    httpClient
      .get(config.api.host+'/api/operatingsystems')
      .then(function(operatingSystems){
        ProductSearchActions.receiveOperatingSystems(operatingSystems);
        resolve();
      }, reject);
  });
}

module.exports.loadModels = function(makeId){
  return new Promise(function(resolve, reject){
    httpClient
      .get(config.api.host+'/api/makes/'+makeId+'/models')
      .then(function(models){
        ProductSearchActions.receiveModels(models);
        resolve();
      }, reject);
  });
}
