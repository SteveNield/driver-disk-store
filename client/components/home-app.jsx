var React = require('react'),
    ReactDOM = require('react-dom'),
    Header = require('./header.jsx'),
    Articles = require('./articles.jsx'),
    ProductSearch = require('./product-search.jsx'),
    BasketStore = require('./../stores/basket-store'),
    ProductSearchStore = require('./../stores/product-search-store');

function getState(){
  var productSearchStoreState = ProductSearchStore.getState();
  return {
    basket: BasketStore.getBasket(),
    makes: productSearchStoreState.makes,
    models: productSearchStoreState.models,
    operatingSystems: productSearchStoreState.operatingSystems,
    selected: productSearchStoreState.selected
  }
}

module.exports = React.createClass({
  getInitialState: function(){
    return getState();
  },
  componentDidMount: function(){
    BasketStore.addChangeListener(this.onChange);
    ProductSearchStore.addChangeListener(this.onChange);
  },
  onChange: function(){
    this.setState(getState());
  },
  render: function(){
      return (<div>
                <Header basket={this.state.basket} />
                <ProductSearch
                  makes={this.state.makes}
                  models={this.state.models}
                  operatingSystems={this.state.operatingSystems}
                  selected={this.state.selected} />
                <Articles />
              </div>);
  }
});
