var React = require('react'),
    Basket = require('./basket.jsx');

module.exports = React.createClass({
  render: function(){
    return (<div>
              <Basket
                basket={this.props.basket}
                allowRemove={false}
                showCheckoutButton={false}
                title="Checkout" />

              <div className="detail-panel inner-container">
                <div class="payment-container">
                    SagePay Integration Starts Here
                </div>
              </div>
            </div>);
  }
})
