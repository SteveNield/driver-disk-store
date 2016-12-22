require('./../dom-mock')('<html><body></body></html>');

var ProductSearch = require('./../../client/components/product-search.jsx'),
    DropDown = require('./../../client/components/drop-down.jsx'),
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

describe('Product', function(){

    var component,
        sandbox,
        makes;

    beforeEach(function(){
      jsdom({skipWindowCheck: true});
      sandbox = sinon.collection;

      makes = [];
    })

    afterEach(function(){
      sandbox.restore();
    })

    function shallowRenderComponent(){
      component = enzyme.shallow(<ProductSearch makes={makes} />);
    }

    function mountComponent(){
      component = enzyme.mount(<ProductSearch makes={makes} />);
    }

    it('exists', function(){
      expect(ProductSearch).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    it('renders 3 DropDown component', function(){
      shallowRenderComponent();
      expect(component.find(DropDown).length).to.equal(3);
    })
});
