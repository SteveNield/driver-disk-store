require('./../dom-mock')('<html><body></body></html>');

var BasketItem = require('./../../client/components/basket-item.jsx'),
    currencyFormatter = require('./../../lib/currency-formatter'),
    productPresentation = require('./../../client/presentation/product-presentation'),
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

describe('BasketItem', function(){

    var component,
        sandbox,
        item,
        onRemoveItem,
        stubs;

    beforeEach(function(){
        jsdom({skipWindowCheck: true});
        sandbox = sinon.collection;

        item = {
          product: {},
          deliveryOption: {}
        };

        onRemoveItem = sandbox.stub();

        stubDependencies();
    })

    afterEach(function(){
      sandbox.restore();
    })

    function stubDependencies(){
      stubs = {
        currencyFormatter: {},
        productPresentation: {}
      };

      stubs.currencyFormatter.format = sandbox
        .stub(currencyFormatter, 'format');

      stubs.productPresentation.getTitle = sandbox
        .stub(productPresentation, 'getTitle');
    }

    function shallowRenderComponent(){
      component = enzyme.shallow(<BasketItem item={item} onRemoveItem={onRemoveItem} />);
    }

    function mountComponent(){
      component = enzyme.mount(<BasketItem item={item} onRemoveItem={onRemoveItem} />);
    }

    it('exists', function(){
      expect(BasketItem).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    it('renders product/option title', function(){
      stubs.productPresentation.getTitle.returns('PRODUCT-TITLE!!');
      shallowRenderComponent();
      expect(component.find('.description').text()).to.equal('PRODUCT-TITLE!!');
    })
    it('renders total price', function(){
      stubs.currencyFormatter.format.returns('£12.12');
      shallowRenderComponent();
      expect(component.find('.total').text()).to.equal('£12.12');
    })
    describe('when delete icon is clicked', function(){
      it('calls onRemoveItem handler', function(){
        shallowRenderComponent();
        component.find('.remove img').simulate('click');
        expect(onRemoveItem).to.have.been.called;
      })
    })
});
