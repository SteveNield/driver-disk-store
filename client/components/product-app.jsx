var React = require('react'),
    Product = require('./product.jsx'),
    Articles = require('./articles.jsx'),
    Header = require('./header.jsx'),
    BasketStore = require('./../stores/basket-store'),
    ProductStore = require('./../stores/product-store');

function getState(){
  return {
    product: ProductStore.getProduct(),
    selected: ProductStore.getSelected(),
    options: ProductStore.getOptions(),
    basket: BasketStore.getBasket()
  }
}

module.exports = React.createClass({
  getInitialState: function(){
    return getState();
  },
  componentDidMount: function(){
    ProductStore.addChangeListener(this.onChange);
    BasketStore.addChangeListener(this.onChange);
  },
  onChange: function(){
    this.setState(getState());
  },
  render: function(){
    return (<div>
              <Header basket={this.state.basket} />
              <Product
                product={this.state.product}
                options={this.state.options}
                selected={this.state.selected} />
              <Articles />
            </div>)
  }
})
