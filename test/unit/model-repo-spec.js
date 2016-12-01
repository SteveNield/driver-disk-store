var modelRepo = require('./../../server/repositories/model-repo'),
    driverApiClient = require('./../../server/data/driver-api-client'),
    sinon = require('sinon'),
    chai = require('chai'),
    sinonAsPromised = require('sinon-as-promised'),
    chaiAsPromised = require('chai-as-promised');

var should = chai.should();
chai.use(chaiAsPromised);

describe('model-repo', function(){
    it('exists', function(){
        modelRepo.should.exist;
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
            modelRepo.getWithMakeId.should.exist; 
        });
        
        it('gets all models for a make from driver-api-client', function(){
            var models = [{ id: '123' },{ id: '345' }];
            
            sandbox
                .stub(driverApiClient, 'get')
                .withArgs('/makes/123/models', { makeId: '123' })
                .resolves(models);
            
            return modelRepo.getWithMakeId('123').should.eventually.equal(models);
        });
        
        it('rejects with error if driver-api-client call fails', function(){
            var error = { status: 404, error: 'FAIL' };
            
            sandbox 
                .stub(driverApiClient, 'get')
                .rejects(error);
            
            return modelRepo.getWithMakeId('123').should.eventually.be.rejectedWith(error)
        });
        
        it('rejects with error if makeId is missing', function(){
            sandbox
                .stub(driverApiClient, 'get');
            
            return modelRepo.getWithMakeId().should.eventually.be.rejectedWith({ message: 'MakeId not specified' });
        });
    });
});