require('./../dom-mock')('<html><body></body></html>');

var Basket = require('./../../client/components/basket.jsx'),
    BasketItem = require('./../../client/components/basket-item.jsx'),
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

describe('Basket', function(){

    var component,
        sandbox,
        basket,
        stubs;

    beforeEach(function(){
        jsdom({skipWindowCheck: true});
        sandbox = sinon.collection;

        basket = {
          id: '123',
          items: []
        };

        stubDependencies();
    })

    afterEach(function(){
      sandbox.restore();
    })

    function stubDependencies(){
      stubs = {
        currencyFormatter: {}
      };

      stubs.currencyFormatter.format = sandbox
        .stub(currencyFormatter, 'format');
    }

    function addBasketItems(numberOfItems){
      for(var i = 0; i < numberOfItems; i++){
        addBasketItem();
      }
    }

    function addBasketItem(price){
      basket.items.push({
        id: '123',
        deliveryOption: {
          price: price || 9.99
        }
      });
    }

    function shallowRenderComponent(){
      component = enzyme.shallow(<Basket basket={basket} />);
    }

    function mountComponent(){
      component = enzyme.mount(<Basket basket={basket} />);
    }

    it('exists', function(){
      expect(Basket).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    it('renders basket title', function(){
      addBasketItems(2);
      shallowRenderComponent();
      expect(component.find('h1').text()).to.equal('Basket - 2 items');
    })
    it('renders a BasketItem for each basket item', function(){
      addBasketItems(2);
      shallowRenderComponent();
      expect(component.find(BasketItem).length).to.equal(2);
    })
    it('renders basket total', function(){
      addBasketItem(9.99);
      addBasketItem(19.99);
      var expectedTotal = '£29.98';
      stubs.currencyFormatter.format
        .returns(expectedTotal);
      shallowRenderComponent();
      expect(component.find('.total .price').text()).to.equal(expectedTotal);
    })
});
