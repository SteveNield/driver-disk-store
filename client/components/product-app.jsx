var React = require('react'),
    Product = require('./../components/product.jsx'),
    Articles = require('./../components/articles.jsx'),
    BasketStore = require('./../stores/basket-store'),
    ProductStore = require('./../stores/product-store');

function getState(){
  return {
    product: ProductStore.getProduct(),
    selected: ProductStore.getSelected()
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
    console.log(JSON.stringify(BasketStore.getBasket()));
    this.setState(getState());
  },
  render: function(){
    return (<div className="inner-container">
              <Product product={this.state.product} selected={this.state.selected} />
              <Articles />
            </div>)
  }
})
