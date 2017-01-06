var React = require('react'),
    Header = require('./header.jsx'),
    CustomerDetailForm = require('./customer-detail-form.jsx'),
    Message = require('./message.jsx'),
    Payment = require('./payment.jsx'),
    BasketStore = require('./../stores/basket-store'),
    CheckoutStore = require('./../stores/checkout-store');

function getState(){
  return {
    basket: BasketStore.getBasket(),
    order: CheckoutStore.getOrder()
  }
}

var checkoutApp = React.createClass({
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
    var component = this;
    return (<div>
              <Header basket={this.state.basket} />
              {
                stateSpecificComponents
                  .find(function(stateSpecificComponent){
                    return stateSpecificComponent.shouldRender(component.state);
                  })
                  .renderComponent(component.state)
              }
            </div>);
  }
})

const stateSpecificComponents = [
  {
    shouldRender: function(state){
      return state.basket.items.length === 0;
    },
    renderComponent: function(state){
      return (<Message
          primary="Your Basket is Empty"
          secondary="Please add at least one item to your basket." />)
    }
  }, {
    shouldRender: function(state){
      return state.basket.items.length > 0 && state.order.customer === undefined;
    },
    renderComponent: function(state){
      return (<CustomerDetailForm basket={state.basket} />)
    }
  }, {
    shouldRender: function(state){
      return state.basket.items.length > 0 && state.order.customer !== undefined;
    },
    renderComponent: function(state){
      return (<Payment basket={state.basket} />)
    }
  }
]

module.exports = checkoutApp;
