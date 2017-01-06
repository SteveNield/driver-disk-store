var React = require('react'),
    Header = require('./header.jsx'),
    Basket = require('./basket.jsx'),
    BasketStore = require('./../stores/basket-store');

function getState(){
  return {
    basket: BasketStore.getBasket()
  }
}

module.exports = React.createClass({
  getInitialState: function(){
    return getState();
  },
  componentDidMount: function(){
    BasketStore.addChangeListener(this.onChange);
  },
  onChange: function(){
    this.setState(getState());
  },
  render: function(){
    return (<div>
              <Header basket={this.state.basket} />
              <Basket
                basket={this.state.basket}
                allowRemove={true}
                showCheckoutButton={true} />
            </div>);
  }
})
