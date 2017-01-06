var Dispatcher = require('./../dispatcher'),
    EventEmitter = require('events').EventEmitter,
    CheckoutConstants = require('./../constants/checkout-constants'),
    OrderApi = require('./../api/order-api'),
    loggr = require('./../../lib/loggr'),
    _ = require('underscore');

var state = {
  order: {}
};

function createOrder(order){
  OrderApi.create(order).then(function(createdOrder){
    state.order = createdOrder;
    loggr.info('Order Created: '+JSON.stringify(createdOrder));
    checkoutStore.emitChange();
  }, function(err){
    loggr.error(err);
  });
}

var checkoutStore = _.extend({}, EventEmitter.prototype, {
  emitChange: function(){
    this.emit('change')
  },
  addChangeListener: function(cb){
    this.on('change', cb);
  },
  getOrder: function(){
    return state.order;
  }
});

Dispatcher.register(function(payload){
  var action = payload.action;
  var text;
  switch(action.actionType){
    case CheckoutConstants.ORDER_CREATE:
      createOrder(action.order);
      break;
    default: return true;
  }
  return true;
})

module.exports = checkoutStore;
