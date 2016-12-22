require('./../dom-mock')('<html><body></body></html>');

var HomeApp = require('./../../client/components/home-app.jsx'),
    Articles = require('./../../client/components/articles.jsx'),
    Header = require('./../../client/components/header.jsx'),
    ProductSearch = require('./../../client/components/product-search.jsx'),
    BasketStore = require('./../../client/stores/basket-store'),
    ProductSearchStore = require('./../../client/stores/product-search-store'),
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

describe('HomeApp', function(){

    var component,
        sandbox,
        stubs,
        basket,
        productSearchForm;

    beforeEach(function(){
        jsdom({skipWindowCheck: true});
        sandbox = sinon.collection;
        stubs = stubDependencies();

        basket = {
          id: '123',
          items: {}
        }

        productSearchForm = {
          makes: [],
          models: [],
          operatingSystems: [],
          selected: {}
        };
    })

    afterEach(function(){
      sandbox.restore();
    })

    function stubDependencies(){
      var stubs = {
        basketStore: {},
        productSearchStore: {}
      };

      stubs.basketStore.getBasket = sandbox
        .stub(BasketStore, 'getBasket')
        .returns(basket);

      stubs.basketStore.addChangeListener = sandbox
        .stub(BasketStore, 'addChangeListener');

      stubs.productSearchStore.getState = sandbox
        .stub(ProductSearchStore, 'getState')
        .returns(productSearchForm);

      return stubs;
    }

    function shallowRenderComponent(){
      component = enzyme.shallow(<HomeApp />);
    }

    function mountComponent(){
      component = enzyme.mount(<HomeApp />);
    }

    it('exists', function(){
      expect(HomeApp).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    it('renders one Header component', function(){
      shallowRenderComponent();
      expect(component.find(Header).length).to.equal(1);
    })
    it('renders one Articles component', function(){
      shallowRenderComponent();
      expect(component.find(Articles).length).to.equal(1);
    })
    it('renders one ProductSearch component', function(){
      shallowRenderComponent();
      expect(component.find(ProductSearch).length).to.equal(1);
    })
    it('sets state.basket correctly', function(){
      shallowRenderComponent();
      expect(component.state().basket).to.deep.equal(basket);
    })
    it('sets state.makes correctly', function(){
      shallowRenderComponent();
      expect(component.state().makes).to.deep.equal(productSearchForm.makes);
    })
    it('sets state.models correctly', function(){
      shallowRenderComponent();
      expect(component.state().models).to.deep.equal(productSearchForm.models);
    })
    it('sets state.operatingSystems correctly', function(){
      shallowRenderComponent();
      expect(component.state().operatingSystems).to.deep.equal(productSearchForm.operatingSystems);
    })

    describe('after mount', function(){
      it('subscribes to changes on BasketStore', function(){
        mountComponent();
        stubs.basketStore.addChangeListener.should.have.been.called;
      })
    })
});
