require('./../dom-mock')('<html><body></body></html>');

var Message = require('./../../client/components/message.jsx'),
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

describe('Message', function(){

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
      component = enzyme.shallow(<Message primary={primary} secondary={secondary} />);
    }

    it('exists', function(){
      expect(Message).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    it('renders primary', function(){
      primary = 'Plaid Shirts';
      shallowRenderComponent();
      expect(component.find('h1').text()).to.equal(primary);
    })
    it('renders secondary', function(){
      secondary = 'Tight Pants';
      shallowRenderComponent();
      expect(component.find('h2').text()).to.equal(secondary);
    })
});
