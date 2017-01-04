var Dispatcher = require('./../dispatcher'),
    Events = require('./../constants/cart');

var cartActions = {
  receiveProduct: function(data){
    Dispatcher.handleAction({
      actionType: Events.RECEIVE_DATA,
      data: data
    })
  },
  receiveBasket: function(basket){
    Dispatcher.handleAction({
      actionType: Events.RECEIVE_BASKET,
      data: basket
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
  },
  receiveOptions: function(options){
    Dispatcher.handleAction({
      actionType: Events.RECEIVE_OPTIONS,
      options: options
    })
  },
  removeFromBasket: function(basketItemId){
    Dispatcher.handleAction({
      actionType: Events.BASKET_REMOVE,
      basketItemId: basketItemId
    })
  }
}

module.exports = cartActions;
