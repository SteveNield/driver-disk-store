var React = require('react');

module.exports = React.createClass({
  resolveBasketSummary: function(){
    if(this.props.basket.items === undefined || this.props.basket.items.length === 0)
      return 'Empty';

    var numberOfItems = this.props.basket.items.length;
    return numberOfItems+' Item'+(numberOfItems>1?'s':'');
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
