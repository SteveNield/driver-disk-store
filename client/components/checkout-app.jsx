var React = require('react'),
    Header = require('./header.jsx'),
    CustomerDetailForm = require('./customer-detail-form.jsx'),
    Message = require('./message.jsx'),
    BasketStore = require('./../stores/basket-store'),
    CheckoutStore = require('./../stores/checkout-store');

function getState(){
  return {
    basket: BasketStore.getBasket(),
    order: CheckoutStore.getOrder()
  }
}

module.exports = React.createClass({
  getInitialState: function(){
    return getState();
  },
  componentDidMount: function(){
    BasketStore.addChangeListener(this.onChange);
    CheckoutStore.addChangeListener(this.onChange);
  },
  onChange: function(){
    this.setState(getState());
  },
  render: function(){
    return (<div>
              <Header basket={this.state.basket} />
              {
                this.state.basket.items.length === 0
                  ? <Message
                      primary="Your Basket is Empty"
                      secondary="Please add at least one item to your basket." />
                    : <CustomerDetailForm basket={this.state.basket} />
              }
            </div>);
  }
})
