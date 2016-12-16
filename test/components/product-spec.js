require('./../dom-mock')('<html><body></body></html>');

var Product = require('./../../client/components/product.jsx'),
    enzyme = require('enzyme'),
    chai = require('chai'),
    chaiEnzyme = require('chai-enzyme'),
    React = require('react'),
    ReactDom = require('react-dom'),
    jsdom = require('mocha-jsdom'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

chai.use(chaiEnzyme());
var expect = chai.expect;
chai.use(sinonChai);

describe('Product component', function(){

  var mock = {
    description: "test-description",
    displayPrice: "£13213654654.99",
    longDescription: "Long and boring description",
    options: [{name: 'great product', image: 'buythis.png'},{name: 'better product'}]
  };

  beforeEach(function(){
      jsdom({skipWindowCheck: true});
  })

  it('exists', function(){
    expect(Product).to.exist;
  })

  function renderComponent(){
    return enzyme.render(<Product product={mock} />);
  }

  it('displays product description', function(){
    var component = renderComponent();
    expect(component.find('.product-title').text()).to.equal(mock.description);
  })

  it('displays product displayPrice', function(){
    var component = renderComponent();
    expect(component.find('.product-price').text()).to.equal(mock.displayPrice);
  })

  it('display product long description', function(){
    var component = renderComponent();
    expect(component.find('.product-description p').text()).to.equal(mock.longDescription);
  })

  it('displays an option for each option', function(){
    var component = renderComponent();
    expect(component.find('.product-options .radio').length).to.equal(mock.options.length);
  })

  it('displays the correct image for the first option', function(){
    var component = renderComponent();
    expect(component.find('.product-image img').prop('src')).to.equal('/interface/'+mock.options[0].image)
  })
})
