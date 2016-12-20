var React = require('react'),
    ReactDom = require('react-dom'),
    Header = require('./components/header.jsx'),
    Product = require('./components/product.jsx'),
    loggr = require('./../lib/loggr'),
    basketStore = require('./stores/basket-store');

loadBasket();

ReactDom.render(<Header />, headerContainer);
ReactDom.render(<Product product={window.globals.product} />, productContainer);

function loadBasket(){
  basketStore.load().then(function(state){
    loggr.info('Basket loaded: '+JSON.stringify(state.basket));
  }, function(err){
    loggr.info(err.message);
  });
}
