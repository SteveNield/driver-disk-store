var React = require('react'),
    ReactDom = require('react-dom'),
    CheckoutApp = require('./components/checkout-app.jsx'),
    BasketApi = require('./api/basket-api');

BasketApi.loadBasketData();

ReactDom.render(<CheckoutApp />, appContainer);
