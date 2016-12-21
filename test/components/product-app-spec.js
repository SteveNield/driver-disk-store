require('./../dom-mock')('<html><body></body></html>');

var ProductApp = require('./../../client/components/product-app.jsx'),
    Product = require('./../../client/components/product.jsx'),
    Articles = require('./../../client/components/articles.jsx'),
    Header = require('./../../client/components/header.jsx'),
    ProductStore = require('./../../client/stores/product-store'),
    BasketStore = require('./../../client/stores/basket-store'),
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

describe('ProductApp', function(){

    var component,
        sandbox,
        stubs,
        product,
        selected,
        basket;

    beforeEach(function(){
        jsdom({skipWindowCheck: true});
        sandbox = sinon.collection;
        stubs = stubStores();

        product = {
          options: [{
            price: 1.11
          }]
        };

        selected = product.options[0];

        basket = {
          id: '123',
          items: {}
        }
    })

    afterEach(function(){
      sandbox.restore();
    })

    function shallowRenderComponent(){
      component = enzyme.shallow(<ProductApp />);
    }

    function mountComponent(){
      component = enzyme.mount(<ProductApp />);
    }

    function stubStores(){
      var stubs = {
        productStore: {},
        basketStore: {}
      };

      stubs.productStore.addChangeListener = sandbox
        .stub(ProductStore, 'addChangeListener');

      stubs.productStore.getProduct = sandbox
        .stub(ProductStore, 'getProduct')
        .returns(product);

      stubs.productStore.getSelected = sandbox
        .stub(ProductStore, 'getSelected')
        .returns(selected);

      stubs.basketStore.addChangeListener = sandbox
        .stub(BasketStore, 'addChangeListener');

      stubs.basketStore.getBasket = sandbox
        .stub(BasketStore, 'getBasket')
        .returns(basket);

      return stubs;
    }

    it('exists', function(){
      expect(ProductApp).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    it('renders one Product component', function(){
      shallowRenderComponent();
      expect(component.find(Product).length).to.equal(1);
    })
    it('renders one Articles component', function(){
      shallowRenderComponent();
      expect(component.find(Articles).length).to.equal(1);
    })
    it('renders one Header component', function(){
      shallowRenderComponent();
      expect(component.find(Header).length).to.equal(1);
    })
    it('sets state.product correctly', function(){
      shallowRenderComponent();
      expect(component.state().product).to.deep.equal(product);
    })
    it('sets state.selected correctly', function(){
      shallowRenderComponent();
      expect(component.state().selected).to.deep.equal(selected);
    })
    it('sets state.basket correctly', function(){
      shallowRenderComponent();
      expect(component.state().basket).to.deep.equal(basket);
    })

    describe('after mount', function(){
      it('subscribes to changes on ProductStore', function(){
        mountComponent();
        expect(stubs.productStore.addChangeListener).to.have.been.called;
      })
      it('subscribes to changes on BasketStore', function(){
        mountComponent();
        expect(stubs.basketStore.addChangeListener).to.have.been.called;
      })
    })
});
