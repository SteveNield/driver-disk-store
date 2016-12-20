var Dispatcher = require('./../dispatcher'),
    Events = require('./../event-registry/cart');

var cartActions = {
  receiveProduct: function(data){
    Dispatcher.handleAction({
      actionType: Events.RECEIVE_DATA,
      data: data
    })
  },
  selectOption: function(index){
    Dispatcher.handleAction({
      actionType: Events.SELECT_OPTION,
      index: index
    })
  },
  addToCart: function(sku){
    Dispatcher.handleAction({
      actionType: Events.CART_ADD,
      sku: sku
    })
  }
}

module.exports = cartActions;
