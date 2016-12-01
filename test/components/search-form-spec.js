require('./../dom-mock')('<html><body></body></html>');

var SearchForm = require('./../../client/components/search-form.jsx'),
    enzyme = require('enzyme'),
    chai = require('chai'),
    chaiEnzyme = require('chai-enzyme'),
    React = require('react'),
    ReactDom = require('react-dom'),
    jsdom = require('mocha-jsdom'),
    sinon = require('sinon'),
    sinonAsPromised = require('sinon-as-promised'),
    sinonChai = require('sinon-chai'),
    laptopStore = require('./../../client/stores/laptop-store'),
    eventHub = require('./../../client/event-hub'),
    browser = require('./../../client/browser');

chai.use(chaiEnzyme());
var expect = chai.expect;
chai.use(sinonChai);

describe('SearchForm', function(){
    
    var component, 
        sandbox,
        laptopStoreSubscribe
    
    beforeEach(function(){
        jsdom({skipWindowCheck: true});
        sandbox = sinon.collection;
        
        laptopStoreSubscribe = sandbox
            .stub(laptopStore, 'subscribe');
        
        sandbox
            .stub(eventHub, 'raise');
    })
    
    afterEach(function(){
        sandbox.restore();
    })
    
    it('exists', function(){
        expect(SearchForm).to.exist;
    })
    
    it('renders', function(){
        component = enzyme.shallow(<SearchForm />);
        expect(component).to.exist;
    })
    
    describe('after mounting', function(){
        it('subscribes to laptopStore', function(){
            component = enzyme.mount(<SearchForm />);
            expect(laptopStoreSubscribe).to.have.been.called;
        });
        
        it('sets the initial state from laptopStore', function(){
            var makes = [{id: '123', name: 'hello'}],
                models = [{id: '3211', name: 'version 1'}],
                operatingSystems = [{id: '12312', name: 'windows 1'}];

            sandbox
                .stub(laptopStore, 'getState')
                .returns({
                    makes: makes,
                    models: models,
                    operatingSystems: operatingSystems
                });

            component = enzyme.mount(<SearchForm />);
            expect(component.state('makes')).to.equal(makes);
            expect(component.state('models')).to.equal(models);
            expect(component.state('operatingSystems')).to.equal(operatingSystems);
        });
    })
    
    describe('when form is submitted', function(){
        describe('but no make is selected', function(){
            it('does not post form', function(){
                var stub = sandbox.stub(browser, 'redirect');
                component = enzyme.mount(<SearchForm />);
                component.setState({
                    selectedModel: 'value',
                    selectedOperatingSystem: 'value'
                })
                component.find('.submit-button').simulate('click');
                component.update();
                expect(stub).to.not.have.been.called;
            });
        })
        
        describe('but no model is selected', function(){
            it('does not post form', function(){
                var stub = sandbox.stub(browser, 'redirect');
                component = enzyme.mount(<SearchForm />);
                component.setState({
                    selectedMake: 'value',
                    selectedOperatingSystem: 'value'
                })
                component.find('.submit-button').simulate('click');
                component.update();
                expect(stub).to.not.have.been.called;
            })
        })
        
        describe('but no operating system is selected', function(){
            it('does not post form', function(){
                var stub = sandbox.stub(browser, 'redirect');
                component = enzyme.mount(<SearchForm />);
                component.setState({
                    selectedMake: 'value',
                    selectedModel: 'value'
                })
                component.find('.submit-button').simulate('click');
                component.update();
                expect(stub).to.not.have.been.called;
            })
        })
        
        describe('and all values are selected', function(){
            it('redirects browser with correct uri', function(){
                var stub = sandbox.stub(browser, 'redirect');
                component = enzyme.mount(<SearchForm />);
                component.setState({
                    'selectedMake': 'make',
                    'selectedModel': 'model',
                    'selectedOperatingSystem': 'os'
                })
                component.update();
                console.log(component.state('selectedMake'));
                component.find('.submit-button').simulate('click');
                expect(stub).to.have.been.calledWith('/products/make/model/os');
            })
        })
    })
})