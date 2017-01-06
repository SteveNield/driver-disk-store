var React = require('react'),
    BasketItem = require('./basket-item.jsx'),
    BasketActions = require('./../actions/basket-actions'),
    DeliveryNotice = require('./delivery-notice.jsx'),
    currencyFormatter = require('./../../lib/currency-formatter');

module.exports = React.createClass({
  calculateBasketTotal: function(){
    var total = this.props.basket.items.reduce(function(total, item){
      return total + item.deliveryOption.price;
    }, 0);

    return currencyFormatter.format('GBP', total);
  },
  onRemoveItem: function(event){
    BasketActions.removeFromBasket(event.target.id);
  },
  resolveTitle: function(){
    return this.props.title || ('Basket - '+this.props.basket.items.length+' item'+(this.props.basket.items.length === 1 ? '' : 's'));
  },
  render: function(){
    var component = this;
    return (<div className="detail-panel basket inner-container">
              <h1>{this.resolveTitle()}</h1>
              <hr />
              <table>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  {this.props.allowRemove ? <th></th> : ''}
                </tr>
                {
                  this.props.basket.items.map(function(item, index){
                    return (<BasketItem
                      item={item}
                      key={index}
                      onRemoveItem={component.onRemoveItem}
                      allowRemove={component.props.allowRemove} />);
                  })
                }
              </table>
              <hr />
              <DeliveryNotice basket={this.props.basket} />
              <div className="basket-row total">
                  <span className="price">{this.calculateBasketTotal()}</span>
                  <span className="title">Basket Total:</span>
              </div>
              {
                this.props.showCheckoutButton ?
                <div className="basket-row">
                    <a href="/checkout" className="btn btn-default submit-button">
                        <span className="glyphicon glyphicon-lock"></span>
                        Proceed to Checkout
                    </a>
                </div> : ''
              }
            </div>);
  }
})
