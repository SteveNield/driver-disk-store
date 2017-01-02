require('./../dom-mock')('<html><body></body></html>');

var ProductOption = require('./../../client/components/product-option.jsx'),
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

describe('ProductOption', function(){

    var component,
        sandbox,
        stubs,
        option,
        index,
        selected;

    beforeEach(function(){
        jsdom({skipWindowCheck: true});
        sandbox = sinon.collection;

        stubs = stubDependencies();
        option = {};
        index = 0;
        selected = 1;
    })

    afterEach(function(){
      sandbox.restore();
    })

    function shallowRenderComponent(){
      component = enzyme.shallow(<ProductOption option={option} index={index} selected={selected} changeSelected={stubs.changeSelected} />);
    }

    function mountComponent(){
      component = enzyme.mount(<ProductOption option={option} index={index} selected={selected} changeSelected={stubs.changeSelected} />);
    }

    function stubDependencies(){
      var stubs = {};
      stubs.changeSelected = sandbox.stub();
      return stubs;
    }

    it('exists', function(){
      expect(ProductOption).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    it('sets id on input', function(){
      option._id = '123123';
      shallowRenderComponent();
      expect(component.find('input').prop('id')).to.equal(option._id);
    })
    describe('when clicked', function(){
      it('calls the changeSelected handler', function(){
        mountComponent();
        component.find('input').simulate('click');
        expect(stubs.changeSelected).to.have.been.called;
      })
    })
    it('sets the value on input', function(){
      index = 1;
      shallowRenderComponent();
      expect(component.find('input').prop('value')).to.equal(index);
    })
    describe('when option is selected', function(){
      it('sets defaultChecked to true', function(){
        selected = '123';
        option._id = '123';
        shallowRenderComponent();
        expect(component.find('input').prop('defaultChecked')).to.be.true;
      })
    })
    describe('when option is no selected', function(){
      it('sets defaultChecked to false', function(){
        selected = '456';
        option._id = '123';
        shallowRenderComponent();
        expect(component.find('input').prop('defaultChecked')).to.be.false;
      })
    })
    describe('when option is delivered', function(){
      it('shows appends (Delivered) to the name', function(){
        option.delivered = true;
        option.name = 'Trousers';
        shallowRenderComponent();
        expect(component.find('label').text()).to.equal('Trousers (Delivered)');
      })
    })
    describe('when option is not delivered', function(){
      it('displays name only', function(){
        option.delivered = false;
        option.name = 'Lancaster';
        shallowRenderComponent();
        expect(component.find('label').text()).to.equal('Lancaster')
      })
    })
});
