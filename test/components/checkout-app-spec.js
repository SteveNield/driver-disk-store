require('./../dom-mock')('<html><body></body></html>');

var CheckoutApp = require('./../../client/components/checkout-app.jsx'),
    CustomerDetailForm = require('./../../client/components/customer-detail-form.jsx'),
    Payment = require('./../../client/components/payment.jsx'),
    Message = require('./../../client/components/message.jsx'),
    Header = require('./../../client/components/header.jsx'),
    BasketStore = require('./../../client/stores/basket-store'),
    CheckoutStore = require('./../../client/stores/checkout-store'),
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

describe('CheckoutApp', function(){

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

        order = {}

        stubs = stubDependencies();
    })

    afterEach(function(){
      sandbox.restore();
    })

    function stubDependencies(){
      var stubs = {
        BasketStore: {},
        CheckoutStore: {}
      };

      stubs.BasketStore.getBasket = sandbox
        .stub(BasketStore, 'getBasket')
        .returns(basket);

      stubs.BasketStore.addChangeListener = sandbox
        .stub(BasketStore, 'addChangeListener');

      stubs.CheckoutStore.getOrder = sandbox
        .stub(CheckoutStore, 'getOrder')
        .returns(order);

      stubs.CheckoutStore.addChangeListener = sandbox
        .stub(CheckoutStore, 'addChangeListener');

      return stubs;
    }

    function shallowRenderComponent(){
      component = enzyme.shallow(<CheckoutApp />);
    }

    function mountComponent(){
      component = enzyme.mount(<CheckoutApp />);
    }

    it('exists', function(){
      expect(CheckoutApp).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    it('renders 1 Header component', function(){
      shallowRenderComponent();
      expect(component.find(Header).length).to.equal(1);
    })
    it('sets state.basket correctly', function(){
      mountComponent();
      expect(component.state().basket).to.deep.equal(basket);
    })
    it('sets state.order correctly', function(){
      mountComponent();
      expect(component.state().order).to.deep.equal(order);
    })
    describe('after mount', function(){
      it('subscribes to changes on BasketStore', function(){
        mountComponent();
        stubs.BasketStore.addChangeListener.should.have.been.called;
      })
      it('subscribes to changes on CheckoutStore', function(){
        mountComponent();
        stubs.CheckoutStore.addChangeListener.should.have.been.called;
      })
    })
    describe('when basket is empty', function(){
      it('renders CustomerDetailEmptyBasket component', function(){
        basket.items = [];
        shallowRenderComponent();
        expect(component.find(Message).length).to.equal(1);
      })
    })
    describe('when basket is not empty', function(){
      it('renders CustomerDetailForm component', function(){
        basket.items.push({});
        shallowRenderComponent();
        expect(component.find(CustomerDetailForm).length).to.equal(1);
      })
    })
    describe('when order is populated and basket is not empty', function(){
      it('renders Payment component', function(){
        basket.items.push({});
        order.customer = { _id: '123' };
        shallowRenderComponent();
        expect(component.find(Payment).length).to.equal(1);
      })
    })
});
