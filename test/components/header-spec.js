require('./../dom-mock')('<html><body></body></html>');

var Header = require('./../../client/components/header.jsx'),
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

describe('Header', function(){

    var component,
        sandbox,
        basket;

    beforeEach(function(){
        jsdom({skipWindowCheck: true});
        sandbox = sinon.collection;

        basket = {
          id: '123',
          items: {}
        }
    })

    afterEach(function(){
      sandbox.restore();
    })

    function shallowRenderComponent(){
      component = enzyme.shallow(<Header basket={basket} />);
    }

    it('exists', function(){
      expect(Header).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })

    function testBasketSummary(text){
      shallowRenderComponent();
      expect(component.find('.detail .text').text()).to.equal(text);
    }
    describe('when basket.items is undefined', function(){
      it('displays "Empty"', function(){
        basket.items = undefined;
        testBasketSummary('Empty');
      })
    })
    describe('when basket is empty', function(){
      it('displays "Empty"', function(){
        basket.items = [];
        testBasketSummary('Empty');
      })
    })
    describe('when basket contains 1 item with a quantity of 1', function(){
      it('displays "1 item"', function(){
        basket.items[1] = { id: '123', quantity: 1 };
        testBasketSummary('1 Item');
      })
    })
    describe('when basket contains 1 item with a quantity of 4', function(){
      it('displays "4 items"', function(){
        basket.items[1] = { id: '123', quantity: 4 };
        testBasketSummary('4 Items');
      })
    })
    describe('when basket contains 2 items with a quantity of 1 each', function(){
      it('displays "2 items"', function(){
        basket.items[1] = { id: '123', quantity: 1 };
        basket.items[2] = { id: '456', quantity: 1 }
        testBasketSummary('2 Items');
      })
    })
    describe('when basket contains 2 items with different quantities', function(){
      it('displays "9 items"', function(){
        basket.items[1] = { id: '123', quantity: 2 };
        basket.items[2] = { id: '456', quantity: 7 };
        testBasketSummary('9 Items');
      })
    })
});
