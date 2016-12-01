var makeRepo = require('./../../server/repositories/make-repo'),
    driverApiClient = require('./../../server/data/driver-api-client'),
    sinon = require('sinon'),
    chai = require('chai'),
    sinonAsPromised = require('sinon-as-promised'),
    chaiAsPromised = require('chai-as-promised');

var should = chai.should();
chai.use(chaiAsPromised);

describe('make-repo', function(){
    it('exists', function(){
        makeRepo.should.exist;
    });
    
    var sandbox;
    
    beforeEach(function(){
        sandbox = sinon.collection; 
    });
    
    afterEach(function(){
        sandbox.restore(); 
    });
    
    describe('get', function(){
        it('exists', function(){
            makeRepo.get.should.exist; 
        });
        
        it('gets all makes from driver-api-client', function(){
            var makes = [{ id: '123' },{ id: '345' }];
            
            sandbox
                .stub(driverApiClient, 'get')
                .withArgs('/makes')
                .resolves(makes);
            
            return makeRepo.get().should.eventually.equal(makes);
        });
        
        it('rejects with error if driver-api-client call fails', function(){
            var error = { status: 404, error: 'FAIL' };
            
            sandbox 
                .stub(driverApiClient, 'get')
                .rejects(error);
            
            return makeRepo.get().should.eventually.be.rejectedWith(error)
        })
    });
});