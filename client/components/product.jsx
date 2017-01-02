var React = require('react'),
    ProductOption = require('./product-option.jsx'),
    CartActions = require('./../actions/cart-actions'),
    currencyFormatter = require('./../../lib/currency-formatter');

module.exports = React.createClass({
  addToBasket: function(event){
    var sku = {
      product: this.props.product._id,
      option: this.props.selected._id
    };
    CartActions.addToCart(sku);
  },
  changeSelected: function(event){
    CartActions.selectOption(event.target.value);
  },
  formatPrice: function(){
    var price = this.props.selected.price;
    return (!price) ? 'Not-loaded' : currencyFormatter.format('GBP', price);
  },
  formatTitle: function(){
    var product = this.props.product,
        selectedOption = this.props.selected;

    return product.make+' '+product.model+' Driver Disk on '+selectedOption.name+' for '+product.operatingSystem;
  },
  render: function(){
    var component = this;
    return (<div className="body-container inner-container">
              <div className="product-row">
                  <div className="product-title"><h1>{this.formatTitle()}</h1></div>
                  <div className="product-price">{this.formatPrice()}</div>
              </div>
              <div className="product-row">
                  <div className="product-image"><img src={"/interface/"+this.props.selected.image} /></div>
                  <div className="product-options detail-panel">
                      <h2>Options:</h2>
                      {
                        this.props.options.map(function(option, index){
                          return (<ProductOption
                                    option={option}
                                    index={index}
                                    selected={component.props.selected._id}
                                    changeSelected={component.changeSelected} />);
                        })
                      }
                      <span className="delivery-notice">
                          <img src="/interface/delivery-van.svg" />
                          Standard delivery time 2 working days to Mainland UK
                      </span>
                  </div>
                  <div className="add-to-basket">
                      <button className="btn btn-default submit-button" onClick={this.addToBasket}>Add to Basket</button>
                  </div>
              </div>
              <div className="detail-panel">
                <h2>Description</h2>
                <p className="option-description">{this.props.selected.description}</p>
                <p className="product-description">{this.props.product.longDescription}</p>
              </div>
          </div>);
  }
})
