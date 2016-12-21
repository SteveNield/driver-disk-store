var React = require('react'),
    ReactDom = require('react-dom'),
    ProductApp = require('./components/product-app.jsx'),
    basketApi = require('./api/basket-api'),
    productApi = require('./api/product-api');

productApi.loadProductData();
basketApi.loadBasketData();

ReactDom.render(<ProductApp />, productContainer);
