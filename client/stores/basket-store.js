var Dispatcher = require('./../dispatcher'),
    EventEmitter = require('events').EventEmitter,
    CartConstants = require('./../constants/cart'),
    basketApi = require('./../api/basket-api'),
    cookieJar = require('./../cookie-jar'),
    uuid = require('uuid'),
    loggr = require('./../../lib/loggr'),
    _ = require('underscore');

var state = {
  basket: {
    items: []
  }
}

function loadBasketData(basket){
  state.basket = basket;
  loggr.info('Basket changed: '+JSON.stringify(state.basket));
  cartStore.emitChange();
}

function add(sku){
  function persistSku(basketId, sku){
    basketApi.addSku(basketId, sku).then(function(){
      basketApi.loadBasketData();
    }, loggr.error)
  }

  var basketId = cookieJar.get('basket');
  if(basketId){
    persistSku(basketId, sku);
  } else {
    basketApi.create().then(function(basket){
      cookieJar.add('basket', basket._id);
      persistSku(basket._id, sku);
    });
  }
}

function remove(basketItemId){
  basketApi.removeItem(state.basket._id, basketItemId).then(function(){
    basketApi.loadBasketData();
  }, loggr.error);
}

var cartStore = _.extend({}, EventEmitter.prototype, {
  emitChange: function(){
    this.emit('change')
  },
  addChangeListener: function(cb){
    this.on('change', cb);
  },
  getBasket: function(){
    return state.basket;
  }
});

Dispatcher.register(function(payload){
  var action = payload.action;
  var text;
  switch(action.actionType){
    case CartConstants.CART_ADD:
      add(action.sku);
      break;
    case CartConstants.BASKET_REMOVE:
      remove(action.basketItemId);
      break;
    case CartConstants.RECEIVE_BASKET:
      loadBasketData(action.data);
      break;
    default: return true;
  }
  return true;
})

module.exports = cartStore;
