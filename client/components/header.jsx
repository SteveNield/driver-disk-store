var React = require('react');

module.exports = React.createClass({
  resolveBasketSummary: function(){
    if(!this.props.basket.items)
      return 'Empty';

    var numberOfItems = 0,
        basket = this.props.basket;
    Object.keys(basket.items).map(function(key){
      numberOfItems += basket.items[key].quantity;
    })
    return numberOfItems === 0 ? 'Empty' : parseInt(numberOfItems)+' Item'+(numberOfItems>1?'s':'');
  },
  render: function(){
    return (<div className="header inner-container">
        <div className="logo">
            restore solutions
        </div>
        <div className="menu">
            <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Help</a></li>
                <li><a href="#"><img src="/interface/facebook.png" /></a></li>
                <li><a href="#"><img src="/interface/twitter.png" /></a></li>
                <li><a href="#"><img src="/interface/googleplus.png" /></a></li>
            </ul>
        </div>
        <div className="basket-summary">
            <div className="detail">
                <div className="image"><img src="/interface/shopping_cart.png" /></div>
                <div className="text">{this.resolveBasketSummary()}</div>
            </div>
            <div className="submit-button btn btn-default">
                <span className="glyphicon glyphicon-lock"></span>
                Checkout
            </div>
        </div>
    </div>)
  }
})
