var eventHub = require('./../event-hub'),
    httpClient = require('./../../lib/http-client'),
    cookieJar = require('./../cookie-jar'),
    uuid = require('uuid'),
    config = require('./../api.conf');

var state = {},
    changeListeners = [];

function publishUpdate(){
    changeListeners.map(function(listener){
        listener(state);
    });
}

module.exports.subscribe = function(callback){
    changeListeners.push(callback);
}

module.exports.getState = function(){
    return state;
}

module.exports.initialiseState = constructState;

module.exports.load = function(){
  eventHub.on('add-to-basket', addToBasket);
  return loadClientBasket();
}

function publishUpdate(){
  var store = this;
  changeListeners.map(function(listener){
    console.log('New Basket Published: ', store.state.basket);
    listener(state);
  });
}

function addToBasket(sku){
  setCookieIfNew();
  persistBasketItem(sku).then(function(basket){
    state.basket = basket;
    publishUpdate();
  });
}

function loadClientBasket(){
  return new Promise(function(resolve, reject){
    var basketId = readClientBasketId();
    if(!basketId){
      constructState();
      resolve(state);
    } else {
      httpClient.get(config.api.host+'/api/basket/'+basketId).then(function(basket){
        state.basket = basket;
        resolve(state);
      }, function(err){
        if(err.status === 400){
          cookieJar.remove('basket');
          constructState();
          resolve(state);
        } else {
          reject(err);
        }
      });
    }
  });
}

function persistBasketItem(sku){
  return new Promise(function(resolve, reject){
    httpClient.put(
      config.api.host+'/api/basket/'+state.basket.id+'/items', {
        sku: sku
      }).then(function(basket){
        resolve(basket);
      }, reject)
    });
}

function constructState(){
  state = {
    basket: {
      id: uuid.v1(),
      items: []
    }
  };
}

function setCookieIfNew(){
  if (readClientBasketId() === undefined){
    cookieJar.add('basket', state.basket.id, { expires: Infinity });
  }
}

function readClientBasketId(){
  return cookieJar.get('basket');
}
