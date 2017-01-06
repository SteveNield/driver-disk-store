require('./../dom-mock')('<html><body></body></html>');

var DeliveryNotice = require('./../../client/components/delivery-notice.jsx'),
    locale = require('./../../lib/locale'),
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

describe('DeliveryNotice', function(){

    var component,
        sandbox,
        basket;

    beforeEach(function(){
        jsdom({skipWindowCheck: true});
        sandbox = sinon.collection;

        basket = {
          items: []
        }

        stubDependencies();
    })

    afterEach(function(){
      sandbox.restore();
    })

    function addBasketItem(option){
      basket.items.push({
        deliveryOption: option
      })
    }

    function stubDependencies(){
      stubs = {
        locale: {}
      };

      stubs.locale.now = sandbox
        .stub(locale, 'now');
    }

    function shallowRenderComponent(){
      component = enzyme.shallow(<DeliveryNotice basket={basket} />);
    }

    it('exists', function(){
      expect(DeliveryNotice).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    describe('delivery notice', function(){
      describe('when basket is empty', function(){
        it('does not show delivery notice', function(){
          basket.items = [];
          shallowRenderComponent();
          expect(component.find('.delivery-notice').length).to.equal(0);
        });
      })
      describe('when basket.items is undefined', function(){
        it('does not show delivery notice', function(){
          basket.items = undefined;
          shallowRenderComponent();
          expect(component.find('.delivery-notice').length).to.equal(0);
        })
      })
      describe('when basket has items', function(){
        it('shows correct date accounting for weekends', function(){
          addBasketItem({ leadTimeInDays: 5 });
          stubs.locale.now.returns(new Date(6, 1, 2017));
          shallowRenderComponent();
          expect(component.find('.delivery-notice').text()).to.equal('Estimated Delivery Date: January 13th 2017')
        })
      })
    })
});
