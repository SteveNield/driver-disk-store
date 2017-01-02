var React = require('react'),
    ReactDom = require('react-dom'),
    ProductApp = require('./components/product-app.jsx'),
    basketApi = require('./api/basket-api'),
    productApi = require('./api/product-api'),
    deliveryOptionApi = require('./api/delivery-option-api');

productApi.loadProductData();
deliveryOptionApi.loadDeliveryOptions();
basketApi.loadBasketData();

ReactDom.render(<ProductApp />, appContainer);
