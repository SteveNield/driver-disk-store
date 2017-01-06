var Dispatcher = require('./../dispatcher'),
    CheckoutConstants = require('./../constants/checkout-constants');

var checkoutActions = {
  createOrder: function(order){
    Dispatcher.handleAction({
      actionType: CheckoutConstants.ORDER_CREATE,
      order: order
    })
  }
}

module.exports = checkoutActions;
