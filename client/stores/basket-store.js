var Dispatcher = require('./../dispatcher'),
    EventEmitter = require('events').EventEmitter,
    Events = require('../event-registry/cart'),
    _ = require('underscore');

var state = {
  skus: {}
}

function add(sku){
  // add item to remote cart
  // get new cart
  // set local state
  // emit change
  var skuId = sku.product+sku.option;
  if (skuId in state.skus){
    state.skus[skuId].quantity+=1;
  } else {
    sku.quantity = 1;
    state.skus[skuId] = sku;
  }
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
    case Events.CART_ADD:
      add(action.sku);
      break;
    default: return true;
  }
  cartStore.emitChange();
  return true;
})

module.exports = cartStore;
