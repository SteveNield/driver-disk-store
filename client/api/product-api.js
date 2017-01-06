var httpClient = require('./../../lib/http-client'),
    BasketActions = require('./../actions/basket-actions'),
    browser = require('./../browser');

module.exports.loadProductData = function(){
  BasketActions.receiveProduct(browser.globals().product);
}
