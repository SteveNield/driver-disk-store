var React = require('react'),
    ReactDom = require('react-dom'),
    Header = require('./components/header.jsx'),
    ProductApp = require('./components/product-app.jsx'),
    productApi = require('./api/product-api');

productApi.loadProductData();

ReactDom.render(<Header />, headerContainer);
ReactDom.render(<ProductApp />, productContainer);
