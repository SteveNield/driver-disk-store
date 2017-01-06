var React = require('react'),
    ReactDOM = require('react-dom'),
    CheckoutActions = require('./../actions/checkout-actions');

module.exports = React.createClass({
  onSubmit: function(event){
    event.preventDefault();
    // hate this - refactor to use controlled component pattern
    CheckoutActions.createOrder({
      basket: this.props.basket._id,
      customer: {
        firstName: ReactDOM.findDOMNode(this.refs.firstName).value,
        lastName: ReactDOM.findDOMNode(this.refs.lastName).value,
        emailAddress: ReactDOM.findDOMNode(this.refs.emailAddress).value,
        billingAddress: {
          line1: ReactDOM.findDOMNode(this.refs.billingLine1).value,
          line2: ReactDOM.findDOMNode(this.refs.billingLine2).value,
          line3: ReactDOM.findDOMNode(this.refs.billingLine3).value,
          line4: ReactDOM.findDOMNode(this.refs.billingLine4).value,
          line5: ReactDOM.findDOMNode(this.refs.billingLine5).value,
          country: ReactDOM.findDOMNode(this.refs.billingCountry).value,
          postcode: ReactDOM.findDOMNode(this.refs.billingPostcode).value
        },
        deliveryAddress: {
          line1: ReactDOM.findDOMNode(this.refs.deliveryLine1).value,
          line2: ReactDOM.findDOMNode(this.refs.deliveryLine2).value,
          line3: ReactDOM.findDOMNode(this.refs.deliveryLine3).value,
          line4: ReactDOM.findDOMNode(this.refs.deliveryLine4).value,
          line5: ReactDOM.findDOMNode(this.refs.deliveryLine5).value,
          country: ReactDOM.findDOMNode(this.refs.deliveryCountry).value,
          postcode: ReactDOM.findDOMNode(this.refs.deliveryPostcode).value
        }
      }
    })
  },
  render: function(){
    return (<div className="detail-panel form-container inner-container">
              <h1>Please Enter Your Details</h1>
              <form>
                  <hr />
                  <div className="form-inline">
                      <div className="form-group">
                          <label>Name</label>
                          <input className="form-control" id="firstName" placeholder="First Name" ref="firstName" />
                      </div>
                      <div className="form-group">
                          <input className="form-control" id="lastName" placeholder="Last Name" ref="lastName" />
                      </div>
                  </div>
                  <div className="form-group form-inline">
                      <label for="emailAddress">Email Address</label>
                      <input className="form-control" type="email" id="emailAddress" ref="emailAddress" />
                  </div>
                  <hr />
                  <h2>Billing Address</h2>
                  <div className="form-group form-inline">
                      <label for="billingLine1">Address</label>
                      <input className="form-control" id="billingLine1" ref="billingLine1" />
                  </div>
                  <div className="form-group form-inline">
                      <label for="billingLine2"></label>
                      <input className="form-control" id="billingLine2" ref="billingLine2" />
                  </div>
                  <div className="form-group form-inline">
                      <label for="billingLine3"></label>
                      <input className="form-control" id="billingLine3" ref="billingLine3" />
                  </div>
                  <div className="form-group form-inline">
                      <label for="billingLine4"></label>
                      <input className="form-control" id="billingLine4" ref="billingLine4" />
                  </div>
                  <div className="form-group form-inline">
                      <label for="billingLine5"></label>
                      <input className="form-control" id="billingLine5" ref="billingLine5" />
                  </div>
                  <div className="form-group form-inline">
                      <label for="billingCountry">Country</label>
                      <input className="form-control" id="billingCountry" ref="billingCountry" />
                  </div>
                  <div className="form-group form-inline">
                      <label for="billingPostcode">Postal / Zip Code</label>
                      <input className="form-control" id="billingPostcode" ref="billingPostcode" />
                  </div>
                  <hr />
                  <h2>Delivery Address</h2>
                  <div className="form-group form-inline">
                      <label for="deliveryLine1">Address</label>
                      <input className="form-control" id="deliveryLine1" ref="deliveryLine1" />
                  </div>
                  <div className="form-group form-inline">
                      <label for="deliveryLine2"></label>
                      <input className="form-control" id="deliveryLine2" ref="deliveryLine2" />
                  </div>
                  <div className="form-group form-inline">
                      <label for="deliveryLine3"></label>
                      <input className="form-control" id="deliveryLine3" ref="deliveryLine3" />
                  </div>
                  <div className="form-group form-inline">
                      <label for="deliveryLine4"></label>
                      <input className="form-control" id="deliveryLine4" ref="deliveryLine4" />
                  </div>
                  <div className="form-group form-inline">
                      <label for="deliveryLine5"></label>
                      <input className="form-control" id="deliveryLine5" ref="deliveryLine5" />
                  </div>
                  <div className="form-group form-inline">
                      <label for="deliveryCountry">Country</label>
                      <input className="form-control" id="deliveryCountry" ref="deliveryCountry" />
                  </div>
                  <div className="form-group form-inline">
                      <label for="deliveryPostcode">Postal / Zip Code</label>
                      <input className="form-control" id="deliveryPostcode" ref="deliveryPostcode" />
                  </div>
                  <div className="form-inline form-group pull-right">
                      <button className="submit-button btn btn-default" onClick={this.onSubmit}>
                          <span className="glyphicon glyphicon-lock"></span>
                          Proceed to Checkout
                      </button>
                  </div>
              </form>
          </div>);
  }
})
