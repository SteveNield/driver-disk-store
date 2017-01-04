require('./../dom-mock')('<html><body></body></html>');

var BasketApp = require('./../../client/components/basket-app.jsx'),
    Header = require('./../../client/components/header.jsx'),
    BasketStore = require('./../../client/stores/basket-store'),
    Basket = require('./../../client/components/basket.jsx'),
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

describe('BasketApp', function(){

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

        stubs = stubDependencies();
    })

    afterEach(function(){
      sandbox.restore();
    })

    function stubDependencies(){
      var stubs = {
        BasketStore: {}
      };

      stubs.BasketStore.getBasket = sandbox
        .stub(BasketStore, 'getBasket')
        .returns(basket);

      stubs.BasketStore.addChangeListener = sandbox
        .stub(BasketStore, 'addChangeListener');

      return stubs;
    }

    function shallowRenderComponent(){
      component = enzyme.shallow(<BasketApp />);
    }

    function mountComponent(){
      component = enzyme.mount(<BasketApp />);
    }

    it('exists', function(){
      expect(BasketApp).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    it('renders 1 Header component', function(){
      shallowRenderComponent();
      expect(component.find(Header).length).to.equal(1);
    })
    it('renders 1 Basket component', function(){
      shallowRenderComponent();
      expect(component.find(Basket).length).to.equal(1);
    })
    it('sets state.basket correctly', function(){
      mountComponent();
      expect(component.state().basket).to.deep.equal(basket);
    })
    describe('after mount', function(){
      it('subscribes to changes on BasketStore', function(){
        mountComponent();
        stubs.BasketStore.addChangeListener.should.have.been.called;
      })
    })
});
