var Dispatcher = require('./../dispatcher'),
    BasketConstants = require('./../constants/basket-constants');

var basketActions = {
  receiveProduct: function(data){
    Dispatcher.handleAction({
      actionType: BasketConstants.RECEIVE_DATA,
      data: data
    })
  },
  receiveBasket: function(basket){
    Dispatcher.handleAction({
      actionType: BasketConstants.RECEIVE_BASKET,
      data: basket
    })
  },
  selectOption: function(index){
    Dispatcher.handleAction({
      actionType: BasketConstants.SELECT_OPTION,
      index: index
    })
  },
  addToCart: function(sku){
    Dispatcher.handleAction({
      actionType: BasketConstants.CART_ADD,
      sku: sku
    })
  },
  receiveOptions: function(options){
    Dispatcher.handleAction({
      actionType: BasketConstants.RECEIVE_OPTIONS,
      options: options
    })
  },
  removeFromBasket: function(basketItemId){
    Dispatcher.handleAction({
      actionType: BasketConstants.BASKET_REMOVE,
      basketItemId: basketItemId
    })
  }
}

module.exports = basketActions;
