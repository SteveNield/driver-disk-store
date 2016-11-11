require('./../dom-mock')('<html><body></body></html>');

var SearchForm = require('./../../client/components/search-form.jsx'),
    enzyme = require('enzyme'),
    chai = require('chai'),
    chaiEnzyme = require('chai-enzyme'),
    React = require('react'),
    ReactDom = require('react-dom'),
    jsdom = require('mocha-jsdom');

chai.use(chaiEnzyme());
var expect = chai.expect;

describe('SearchForm', function(){
    jsdom({skipWindowCheck: true});
    
    var component;
    
    function renderComponent(){
        component = enzyme.shallow(<SearchForm />);
    }
                                   
    beforeEach(function(){
        renderComponent();     
    });
    
    it('exists', function(){
        expect(SearchForm).to.exist;
    })
    
    it('renders', function(){
        expect(component).to.exist;
    })
        
    it('opens "make" dropdown when clicked', function(){
        component.find('#openMake').simulate('click');
        expect(component.find('#makeList')).to.not.have.className('hidden');
    })
    
    it('closes all other dropdowns when "make" it clicked', function(){
        component.find('#openMake').simulate('click');
        expect(component.find('#modelList')).to.have.className('hidden');
        expect(component.find('#windowsList')).to.have.className('hidden');
    })
})