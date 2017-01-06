var React = require('react'),
    moment = require('moment-business-days');

module.exports = React.createClass({
  shouldRender: function(){
    return (this.props.basket.items !== undefined && this.props.basket.items.length > 0);
  },
  calculateEstimatedDeliveryDate: function(){
    if(!this.shouldRender()){
      return '#NODATE#';
    }

    var basketItemWithLongestLeadTime = this.props.basket.items.reduce(function(prev, current) {
      var prevLeadTime = prev.deliveryOption.leadTimeInDays,
          currentLeadTime = current.deliveryOption.leadTimeInDays;

      return (prevLeadTime > currentLeadTime) ? prev : current;
    });
    return moment(new Date()).businessAdd(basketItemWithLongestLeadTime.deliveryOption.leadTimeInDays).format('MMMM Do YYYY');
  },
  render: function(){
    return (<div className="basket-row">
                {
                  this.shouldRender() ?
                  <span className="delivery-notice">
                      <img src="/interface/delivery-van.svg" />
                      {"Estimated Delivery Date: "+this.calculateEstimatedDeliveryDate()}
                  </span> : ''
                }
            </div>);
  }
})
