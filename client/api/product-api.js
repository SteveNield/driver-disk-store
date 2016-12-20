var httpClient = require('./../../lib/http-client'),
    CartActions = require('./../actions/cart');

module.exports.loadProductData = function(){
  CartActions.receiveProduct(window.globals.product);
}
