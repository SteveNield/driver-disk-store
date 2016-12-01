var laptopStore = require('./../../client/stores/laptop-store'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    sinonAsPromised = require('sinon-as-promised'),
    httpClient = require('./../../lib/http-client'),
    eventHub = require('./../../client/event-hub');

var should = chai.should();

describe('laptop-store', function(){
    
    it('exists', function(){
        laptopStore.should.exist; 
    });
    
    describe('subscription mechanism', function(){
        var sandbox, 
            handler, 
            httpClientGet,
            makeId = '12345';

        beforeEach(function(){
            sandbox = sinon.collection;

            sandbox.stub(eventHub, 'on', function(event, callback){
                event = event;
                handler = callback;
            });

            httpClientGet = sandbox
                .stub(httpClient, 'get')
                .resolves();
        });

        afterEach(function(){
            sandbox.restore(); 
            laptopStore.reinitialiseState();
        });
        
        it('gets models from httpClient when "make-change" event is raised on the event-hub', function(){
            laptopStore.load();

            handler(makeId);

            httpClientGet.should.have.been.calledWith('/makes/'+makeId+'/models');
        });
    });
    
    describe('getState', function(){
        it('exists', function(){
            laptopStore.getState.should.exist;
        });
        
        it('returns the correct initial state', function(){
            laptopStore.getState().should.deep.equal({
                makes: [],
                models: [],
                operatingSystems: []
            });
        });
    });
    
    describe('load', function(){
        
        var sandbox;
        
        beforeEach(function(){
            sandbox = sinon.collection; 
            sandbox.stub(eventHub, 'on');
        });
        
        afterEach(function(){
            sandbox.restore(); 
        });
        
        it('exists', function(){
            laptopStore.load.should.exist; 
        });
        
        it('gets makes from httpClient', function(){
            var stub = sandbox
                .stub(httpClient, 'get')
                .resolves();
            
            laptopStore.load();
            
            stub.should.have.been.calledWith('/makes');
        });
        
        it('gets operating systems from httpClient', function(){
            var stub = sandbox
                .stub(httpClient, 'get')
                .resolves();
            
            laptopStore.load();
            
            stub.should.have.been.calledWith('/operatingsystems');
        });
    });
});