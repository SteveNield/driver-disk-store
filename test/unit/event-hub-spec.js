var eventHub = require('./../../client/event-hub'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    chai = require('chai');

var should = chai.should();
chai.use(sinonChai);

describe('event-hub', function(){   
    
    var sandbox;
    
    beforeEach(function(){
        sandbox = sinon.collection;
    });
    
    afterEach(function(){
        sandbox.restore(); 
    });
    
    it('exists', function(){
        eventHub.should.exist;
    });
    
    it('fires a previously registered event handler when that event is raised with the correct arguments', function(){
        var stub = sandbox.stub(),
            args = { a:'b', c:1 };
        
        eventHub.on('test-event', stub);
        
        eventHub.raise('test-event', args);
        
        stub.should.have.been.calledWith(args);
    });
    
    it('logs an error when an event is called for which there are no registered handlers', function(){
        var loggr = require('./../../lib/loggr');
        
        var stub = sandbox.stub(loggr, 'error');
        
        eventHub.raise('totally-unregistered-event', {});
        
        stub.should.have.been.calledWith('Event totally-unregistered-event has no registered handlers');
    });
});