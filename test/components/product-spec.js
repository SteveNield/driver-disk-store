require('./../dom-mock')('<html><body></body></html>');

var Product = require('./../../client/components/product.jsx'),
    ProductOption = require('./../../client/components/product-option.jsx'),
    BasketActions = require('./../../client/actions/basket-actions'),
    currencyFormatter = require('./../../lib/currency-formatter'),
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

describe('Product', function(){

    var component,
        sandbox,
        stubs,
        product,
        options,
        selected;

    beforeEach(function(){
        jsdom({skipWindowCheck: true});
        sandbox = sinon.collection;
        stubs = stubDependencies();

        product = {};

        options = [{
          price: 1.11
        }];

        selected = options[0];
    })

    afterEach(function(){
      sandbox.restore();
    })

    function shallowRenderComponent(){
      component = enzyme.shallow(<Product product={product} options={options} selected={selected} />);
    }

    function mountComponent(){
      component = enzyme.mount(<Product product={product} options={options} selected={selected} />);
    }

    function stubDependencies(){
      var stubs = {
        currencyFormatter: {},
        BasketActions: {}
      };

      stubs.BasketActions.addToCart = sandbox
        .stub(BasketActions, 'addToCart');

      stubs.BasketActions.selectOption = sandbox
        .stub(BasketActions, 'selectOption');

      stubs.currencyFormatter.format = sandbox
        .stub(currencyFormatter, 'format');

      return stubs;
    }

    it('exists', function(){
      expect(Product).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    it('product description is correct concatenation of make, model and OS', function(){
      product.make = 'Acer';
      product.model = '5580';
      product.operatingSystem = 'Windows XP';
      options[0].name = 'DVD ROM';
      var expectedDescription = 'Acer 5580 Driver Disk on DVD ROM for Windows XP';
      shallowRenderComponent();
      expect(component.find('.product-title').text()).to.equal(expectedDescription);
    })
    it('shows selected option price', function(){
      stubs.currencyFormatter.format.returns('£1.11');
      shallowRenderComponent();
      expect(component.find('.product-price').text()).to.equal('£1.11');
    })
    it('shows selected option image', function(){
      selected.image = 'image.jpg';
      shallowRenderComponent();
      expect(component.find('.product-image img').prop('src')).to.equal('/interface/'+selected.image);
    })
    describe('if selected.image is undefined', function(){
      it('displays ajaxloader.gif as the img src', function(){
        selected.image = undefined;
        shallowRenderComponent();
        expect(component.find('.product-image img').prop('src')).to.equal('/interface/ajax-loader.gif');
      })
    })
    it('renders a ProductOption for each product option', function(){
      options = [{ _id: '123' }, { _id: '4556' }, { _id: '789' }];
      shallowRenderComponent();
      expect(component.find(ProductOption).length).to.equal(3);
    })
    it('shows product long description', function(){
      product.longDescription = 'This is a very long and boring description of a product';
      shallowRenderComponent();
      expect(component.find('.product-description').text()).to.equal(product.longDescription);
    })
    it('shows selected option description', function(){
      selected.description = 'The better option';
      shallowRenderComponent();
      expect(component.find('.option-description').text()).to.equal(selected.description);
    })
});
