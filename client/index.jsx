var React = require('react'),
    ReactDom = require('react-dom'),
    SearchForm = require('./components/search-form.jsx'),
    laptopStore = require('./stores/laptop-store');

laptopStore.load();

ReactDom.render(<SearchForm />, searchFormContainer);