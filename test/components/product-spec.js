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
    longDescription: "Long and boring description",
    options: [{
      id: '123',
      name: 'great product',
      image: 'buythis.png',
      price: 91.99,
      description: 'this option is the best!'
    },{
      id: '456',
      name: 'better product',
      image: 'better.png',
      price: 88.99,
      description: 'this option is better than the best'
    }]
  };

  beforeEach(function(){
      jsdom({skipWindowCheck: true});
  })

  it('exists', function(){
    expect(Product).to.exist;
  })

  function renderComponent(){
    return enzyme.mount(<Product product={mock} />);
  }

  it('sets the selectedOption as the first option on mount', function(){
    var component = renderComponent();
    expect(component.state().selectedOption).to.equal(mock.options[0]);
  })

  it('displays product description', function(){
    var component = renderComponent();
    expect(component.find('.product-title').text()).to.equal(mock.description);
  })

  it('formats and displays the selectedOption price', function(){
    var component = renderComponent();
    expect(component.find('.product-price').text()).to.equal('£91.99');
  })

  it('display product long description', function(){
    var component = renderComponent();
    expect(component.find('.product-description').text()).to.equal(mock.longDescription);
  })

  it('displays the selectedOption description', function(){
    var component = renderComponent();
    expect(component.find('.option-description').text()).to.equal(mock.options[0].description)
  })

  it('displays an option for each option', function(){
    var component = renderComponent();
    expect(component.find('.product-options .radio').length).to.equal(mock.options.length);
  })

  it('displays the correct image for the selectedOption', function(){
    var component = renderComponent();
    expect(component.find('.product-image img').prop('src')).to.equal('/interface/'+mock.options[0].image)
  })

  describe('when a new option is clicked', function(){

    var component;

    beforeEach(function(){
      component = renderComponent();
      component.find('.product-options .radio input[value="'+mock.options[1].id+'"]').simulate('click');
    })

    it('sets the selectedOption to be the new option', function(){
      expect(component.state().selectedOption).to.equal(mock.options[1]);
    })

    it('displays the new selectedOption price', function(){
      expect(component.find('.product-price').text()).to.equal('£88.99');
    })

    it('displays the new selectedOption image', function(){
      expect(component.find('.product-image img').prop('src')).to.equal('/interface/'+mock.options[1].image)
    })

    it('displays the description for the new selectedOption', function(){
      expect(component.find('.option-description').text()).to.equal(mock.options[1].description)
    })
  })
})
