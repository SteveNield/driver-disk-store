var httpClient = require('./../../lib/http-client'),
    CartActions = require('./../actions/cart'),
    browser = require('./../browser');

module.exports.loadProductData = function(){
  CartActions.receiveProduct(browser.globals().product);
}
