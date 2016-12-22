var Dispatcher = require('./../dispatcher'),
    EventEmitter = require('events').EventEmitter,
    CartConstants = require('./../constants/cart'),
    basketApi = require('./../api/basket-api'),
    cookieJar = require('./../cookie-jar'),
    uuid = require('uuid'),
    loggr = require('./../../lib/loggr'),
    _ = require('underscore');

var state = {}

function loadBasketData(basket){
  state = basket;
  loggr.info('Basket changed: '+JSON.stringify(state));
  cartStore.emitChange();
}

function add(sku){
  function getOrSetBasketId(){
    var basketId = cookieJar.get('basket');
    if(!basketId){
      basketId = uuid.v1();
      cookieJar.add('basket', basketId);
    }
    return basketId;
  }

  var basketId = getOrSetBasketId();
  basketApi.addSku(basketId, sku).then(function(){
    basketApi.loadBasketData();
  }, function(err){
    loggr.error('Error adding item to basket')
  })
}

var cartStore = _.extend({}, EventEmitter.prototype, {
  emitChange: function(){
    this.emit('change')
  },
  addChangeListener: function(cb){
    this.on('change', cb);
  },
  getBasket: function(){
    return state;
  }
});

Dispatcher.register(function(payload){
  var action = payload.action;
  var text;
  switch(action.actionType){
    case CartConstants.CART_ADD:
      add(action.sku);
      break;
    case CartConstants.RECEIVE_BASKET:
      loadBasketData(action.data);
      break;
    default: return true;
  }
  return true;
})

module.exports = cartStore;
