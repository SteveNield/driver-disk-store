var React = require('react'),
    ReactDom = require('react-dom'),
    BasketApp = require('./components/basket-app.jsx'),
    BasketApi = require('./api/basket-api');

BasketApi.loadBasketData();

ReactDom.render(<BasketApp />, appContainer);
