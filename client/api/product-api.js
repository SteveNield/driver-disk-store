var httpClient = require('./../../lib/http-client'),
    CartActions = require('./../actions/cart-actions'),
    browser = require('./../browser');

module.exports.loadProductData = function(){
  CartActions.receiveProduct(browser.globals().product);
}
