require('./../dom-mock')('<html><body></body></html>');

var Basket = require('./../../client/components/basket.jsx'),
    BasketItem = require('./../../client/components/basket-item.jsx'),
    DeliveryNotice = require('./../../client/components/delivery-notice.jsx'),
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
        allowRemove,
        title,
        showCheckoutButton,
        stubs;

    beforeEach(function(){
        jsdom({skipWindowCheck: true});
        sandbox = sinon.collection;

        basket = {
          id: '123',
          items: []
        };

        allowRemove = true;
        showCheckoutButton = true;

        stubDependencies();
    })

    afterEach(function(){
      sandbox.restore();
    })

    function stubDependencies(){
      stubs = {
        currencyFormatter: {},
        locale: {}
      };

      stubs.currencyFormatter.format = sandbox
        .stub(currencyFormatter, 'format');
    }

    function addBasketItems(numberOfItems){
      for(var i = 0; i < numberOfItems; i++){
        addBasketItem({});
      }
    }

    function addBasketItem(option){
      basket.items.push({
        id: '123',
        deliveryOption: {
          price: option.price || 9.99,
          leadTimeInDays: option.leadTimeInDays || 4
        }
      });
    }

    function shallowRenderComponent(){
      component = enzyme.shallow(<Basket
        basket={basket}
        allowRemove={allowRemove}
        showCheckoutButton = {showCheckoutButton}
        title={title} />);
    }

    it('exists', function(){
      expect(Basket).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    describe('when title is supplied', function(){
      it('renders supplied title', function(){
        title = 'TITLE!';
        shallowRenderComponent();
        expect(component.find('h1').text()).to.equal(title);
      })
    })
    describe('when title is not supplied', function(){
      it('renders basket title', function(){
        addBasketItems(2);
        title = undefined;
        shallowRenderComponent();
        expect(component.find('h1').text()).to.equal('Basket - 2 items');
      })
    })
    it('renders a BasketItem for each basket item', function(){
      addBasketItems(2);
      shallowRenderComponent();
      expect(component.find(BasketItem).length).to.equal(2);
    })
    it('renders 1 DeliveryNotice component', function(){
      shallowRenderComponent();
      expect(component.find(DeliveryNotice).length).to.equal(1);
    })
    it('renders basket total', function(){
      addBasketItem({ price: 9.99 });
      addBasketItem({ price: 19.99 });
      var expectedTotal = '£29.98';
      stubs.currencyFormatter.format
        .returns(expectedTotal);
      shallowRenderComponent();
      expect(component.find('.total .price').text()).to.equal(expectedTotal);
    })
    describe('when allowRemove is true', function(){
      it('shows the remove header', function(){
        allowRemove = true;
        shallowRenderComponent();
        expect(component.find('th').length).to.equal(3);
      })
    })
    describe('when allowRemove is false', function(){
      it('does not show remove header', function(){
        allowRemove = false;
        shallowRenderComponent();
        expect(component.find('th').length).to.equal(2);
      })
    })
    describe('when showCheckoutButton is true', function(){
      it('renders the checkout button', function(){
        showCheckoutButton = true;
        shallowRenderComponent();
        expect(component.find('.submit-button').length).to.equal(1);
      })
    })
    describe('when showCheckoutButton is false', function(){
      it('does not render the checkout button', function(){
        showCheckoutButton = false;
        shallowRenderComponent();
        expect(component.find('.submit-button').length).to.equal(0);
      })
    })
});
