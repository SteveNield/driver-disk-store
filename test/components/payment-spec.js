require('./../dom-mock')('<html><body></body></html>');

var Payment = require('./../../client/components/payment.jsx'),
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

describe('Payment', function(){

    var component,
        sandbox,
        primary,
        secondary;

    beforeEach(function(){
        jsdom({skipWindowCheck: true});
        sandbox = sinon.collection;
    })

    afterEach(function(){
      sandbox.restore();
    })

    function shallowRenderComponent(){
      component = enzyme.shallow(<Payment />);
    }

    function mountComponent(){
      component = enzyme.mount(<Payment />);
    }

    it('exists', function(){
      expect(Payment).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    it('renders 1 Basket component', function(){
      shallowRenderComponent();
      expect(component.find(Basket).length).to.equal(1);
    })
});
