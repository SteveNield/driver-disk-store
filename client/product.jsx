var React = require('react'),
    ReactDom = require('react-dom'),
    Header = require('./components/header.jsx'),
    Product = require('./components/product.jsx');

ReactDom.render(<Header />, headerContainer);
ReactDom.render(<Product />, productContainer);
