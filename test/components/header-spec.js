require('./../dom-mock')('<html><body></body></html>');

var Header = require('./../../client/components/header.jsx'),
    browser = require('./../../client/browser'),
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
        basket,
        stubs;

    beforeEach(function(){
        jsdom({skipWindowCheck: true});
        sandbox = sinon.collection;
        stubDependencies();

        basket = {
          id: '123',
          items: []
        }
    })

    afterEach(function(){
      sandbox.restore();
    })

    function stubDependencies(){
      stubs = {
        browser: {}
      };

      stubs.browser.redirect = sandbox
        .stub(browser, 'redirect');
    }

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
    describe('when basket is empty', function(){
      it('displays "Empty"', function(){
        basket.items = [];
        testBasketSummary('Empty');
      })
    })
    describe('when basket.items is undefined', function(){
      it('displays "Empty"', function(){
        basket.items = undefined;
        testBasketSummary('Empty');
      })
    })
    describe('when basket contains 1 item', function(){
      it('displays "1 item"', function(){
        basket.items[0] = { id: '123' };
        testBasketSummary('1 Item');
      })
    })
    describe('when basket contains 4 items', function(){
      it('displays "4 Items"', function(){
        basket.items = [{},{},{},{}];
        testBasketSummary('4 Items');
      })
    })
    describe('when "View Basket" is clicked', function(){
      it('redirects browser to /basket', function(){
        shallowRenderComponent();
        component.find('.submit-button').simulate('click');
        stubs.browser.redirect.should.have.been.calledWith('/basket');
      })
    })
});
