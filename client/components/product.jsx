var React = require('react'),
    eventHub = require('./../event-hub'),
    currencyFormatter = require('./../../lib/currency-formatter');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      selectedOption: this.props.product.options[0]
    }
  },
  changeSelectedOption: function(event){
    var newOption = this.props.product.options.find(function(option){
      return option.id === event.target.value;
    });

    this.setState({selectedOption: newOption});
  },
  addToBasket: function(){
    eventHub.raise('add-to-basket', {
      product: this.props.product.id,
      option: this.state.selectedOption.id
    })
  },
  render: function(){
    var component = this;
    return (<div>
              <div className="body-container inner-container">
                  <div className="product-row">
                      <div className="product-title"><h1>{this.props.product.description}</h1></div>
                      <div className="product-price">{currencyFormatter.format('GBP', this.state.selectedOption.price)}</div>
                  </div>
                  <div className="product-row">
                      <div className="product-image"><img src={"/interface/"+this.state.selectedOption.image} /></div>
                      <div className="product-options detail-panel">
                          <h2>Options:</h2>
                          {
                            this.props.product.options.map(function(option, index){
                              return (<div className="radio" key={index}>
                                <label>
                                  <input
                                    type="radio"
                                    name="options"
                                    id={"options"+option.name}
                                    onClick={component.changeSelectedOption}
                                    value={option.id}
                                    defaultChecked={(option.id === component.state.selectedOption.id)} />
                                    {option.name}{(option.delivered) ? " (Delivered)" : ""}
                                  </label>
                              </div>);
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
                    <p className="option-description">{this.state.selectedOption.description}</p>
                    <p className="product-description">{this.props.product.longDescription}</p>
                  </div>
              </div>
              <div className="articles-container inner-container">
                  <div className="article">
                      <img src="/interface/dvd.png" />
                      <span className="text-content">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc nisl. Duis scelerisque efficitur malesuada. Sed posuere lobortis metus ac sodales. In lobortis nulla nisi, eu lacinia risus volutpat in. Mauris hendrerit in dui in vulputate. In ultricies mauris nisl, id congue lorem egestas blandit. Vestibulum id elit ultricies, sollicitudin felis non, dapibus justo.
                      </span>
                  </div>
                  <div className="article">
                      <img src="/interface/search.png" />
                      <span className="text-content">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc nisl. Duis scelerisque efficitur malesuada. Sed posuere lobortis metus ac sodales. In lobortis nulla nisi, eu lacinia risus volutpat in. Mauris hendrerit in dui in vulputate. In ultricies mauris nisl, id congue lorem egestas blandit. Vestibulum id elit ultricies, sollicitudin felis non, dapibus justo.
                      </span>
                  </div>
                  <div className="article article-last">
                      <img src="/interface/testing.png" />
                      <span className="text-content">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc nisl. Duis scelerisque efficitur malesuada. Sed posuere lobortis metus ac sodales. In lobortis nulla nisi, eu lacinia risus volutpat in. Mauris hendrerit in dui in vulputate. In ultricies mauris nisl, id congue lorem egestas blandit. Vestibulum id elit ultricies, sollicitudin felis non, dapibus justo.
                      </span>
                  </div>
              </div>
          </div>)
  }
})
