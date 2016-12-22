var React = require('react'),
    ReactDom = require('react-dom'),
    HomeApp = require('./components/home-app.jsx'),
    BasketApi = require('./api/basket-api'),
    ProductSearchApi = require('./api/product-search-api');

BasketApi.loadBasketData();
ProductSearchApi.loadMakes();
ProductSearchApi.loadOperatingSystems();

ReactDom.render(<HomeApp />, appContainer);
