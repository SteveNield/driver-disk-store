var React = require('react'),
    ProductOption = require('./product-option.jsx'),
    BasketActions = require('./../actions/basket-actions'),
    productPresentation = require('./../presentation/product-presentation'),
    currencyFormatter = require('./../../lib/currency-formatter');

module.exports = React.createClass({
  addToBasket: function(event){
    var sku = {
      product: this.props.product._id,
      option: this.props.selected._id
    };
    BasketActions.addToCart(sku);
  },
  changeSelected: function(event){
    BasketActions.selectOption(event.target.value);
  },
  formatPrice: function(){
    var price = this.props.selected.price;
    return (!price) ? 'Not-loaded' : currencyFormatter.format('GBP', price);
  },
  getImageProps: function(){
    var imageName = this.props.selected.image || 'ajax-loader.gif';
    var className = this.props.selected.image ? 'product' : 'loading';
    return {
      src: '/interface/'+imageName,
      className: className
    }
  },
  render: function(){
    var component = this;
    return (<div className="body-container inner-container">
              <div className="product-row">
                  <div className="product-title"><h1>{productPresentation.getTitle(this.props.product, this.props.selected)}</h1></div>
                  <div className="product-price">{this.formatPrice()}</div>
              </div>
              <div className="product-row">
                  <div className="product-image"><img {...this.getImageProps()} /></div>
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
