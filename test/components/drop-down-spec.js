require('./../dom-mock')('<html><body></body></html>');

var DropDown = require('./../../client/components/drop-down.jsx'),
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

describe('DropDown', function(){
    
    var component, 
        sandbox,
        options;
    
    beforeEach(function(){
        jsdom({skipWindowCheck: true});
        sandbox = sinon.collection;
        
        options = {
            label: 'selected_value',
            items: [],
            changed: sandbox.stub(),
            emptyMessage: ''
        };
    })
    
    afterEach(function(){
        sandbox.restore();
    })
    
    function renderComponent(){
        component = enzyme.shallow(<DropDown defaultLabel={options.defaultLabel} label={options.label} valid={options.valid} emptyMessage={options.emptyMessage} items={options.items} buttonClicked={options.buttonClicked} itemSelected={options.itemSelected} state={options.state} />);
    }
    
    it('exists', function(){
        expect(DropDown).to.exist;
    });
    
    it('renders', function(){
        renderComponent();
        expect(component).to.exist;
    });
        
    describe('when populated with at least one item of data', function(){
        it('populates list items for each item plus one for the dropdown title', function(){
            options.items.push({ id: '123', name: 'item-1' });
            options.items.push({ id: '456', name: 'item-2' });
            options.label = 'test-dropdown';

            renderComponent();

            expect(component.find('#test-dropdown').children()).to.have.length(3);
        });
    })
    
    describe('when not populated', function(){
        it('populates dropdown with an item containing empty message plus one <option> for the title', function(){
            options.items = [];
            options.label = 'test-dropdown';
            
            renderComponent();
            
            expect(component.find('#test-dropdown').children()).to.have.length(2);
        })
        
        it('correctly displays the emptyMessage in the dropdown', function(){
            options.items = [];
            options.label = 'test-dropdown';
            options.emptyMessage = 'EMPTY!';
            
            renderComponent();
            
            expect(component.find('.empty-message').text()).to.equal('EMPTY!');
        })
    })
})