var React = require('react');

module.exports = React.createClass({
  render: function(){
    return (<div>
              <div className="body-container inner-container">
                  <div className="product-row">
                      <div className="product-title"><h1>{this.props.product.description}</h1></div>
                      <div className="product-price">{this.props.product.displayPrice}</div>
                  </div>
                  <div className="product-row">
                      <div className="product-image"><img src={"/interface/"+this.props.product.options[0].image} /></div>
                      <div className="product-options detail-panel">
                          <h2>Options:</h2>
                          {
                            this.props.product.options.map(function(option, index){
                              return (<div className="radio" key={index}>
                                <label>
                                  <input type="radio" name="options" id={"options"+option.name} value={option.name} defaultChecked={(index === 0)} />
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
                          <button className="btn btn-default submit-button">Add to Basket</button>
                      </div>
                  </div>
                  <div className="product-description detail-panel"><h2>Description</h2>
                      <p>{this.props.product.longDescription}</p>
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
