require('./../dom-mock')('<html><body></body></html>');

var DropDown = require('./../../client/components/drop-down.jsx'),
    enzyme = require('enzyme'),
    chai = require('chai'),
    chaiEnzyme = require('chai-enzyme'),
    React = require('react'),
    ReactDom = require('react-dom'),
    jsdom = require('mocha-jsdom');

chai.use(chaiEnzyme());
var expect = chai.expect;

describe('DropDown', function(){

    var component,
        sandbox,
        items,
        label,
        emptyMessage,
        onChange;

    beforeEach(function(){
      jsdom({skipWindowCheck: true});
      sandbox = sinon.collection;

      items = [];
      label = "Label",
      emptyMessage = "We've got nothing left!";
      onChange = sandbox.stub();
    })

    afterEach(function(){
      sandbox.restore();
    })

    function shallowRenderComponent(){
      component = enzyme.shallow(<DropDown items={items} label={label} emptyMessage={emptyMessage} onChange={onChange} />);
    }

    it('exists', function(){
      expect(DropDown).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    it('renders 1 option for each item', function(){
      items = [
        { id: '123', name: 'red' },
        { id: '456', name: 'green' },
        { id: '789', name: 'blue' }
      ];
      shallowRenderComponent();
      expect(component.find('option.item').length).to.equal(items.length);
    })
    it('renders 1 option to show the label', function(){
      shallowRenderComponent();
      expect(component.find('option').first().text()).to.equal(label);
    })
    describe('when items is empty', function(){
      it('renders 1 option to show empty message', function(){
        shallowRenderComponent();
        expect(component.find('option.empty-message').text()).to.equal(emptyMessage);
      })
    })
    describe('when item is selected', function(){
      it('calls onChange handler', function(){
        shallowRenderComponent();
        component.find('select').simulate('change');
        expect(onChange).to.have.been.called;
      })
    })
});
