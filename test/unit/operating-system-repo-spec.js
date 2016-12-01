var operatingSystemRepo = require('./../../server/repositories/operating-system-repo'),
    driverApiClient = require('./../../server/data/driver-api-client'),
    sinon = require('sinon'),
    chai = require('chai'),
    sinonAsPromised = require('sinon-as-promised'),
    chaiAsPromised = require('chai-as-promised');

var should = chai.should();
chai.use(chaiAsPromised);

describe('operating-system-repo', function(){
    it('exists', function(){
        operatingSystemRepo.should.exist;
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
            operatingSystemRepo.get.should.exist; 
        });
        
        it('gets all operating systems from driver-api-client', function(){
            var operatingSystems = [{ id: '123' },{ id: '345' }];
            
            sandbox
                .stub(driverApiClient, 'get')
                .withArgs('/operatingsystems')
                .resolves(operatingSystems);
            
            return operatingSystemRepo.get().should.eventually.equal(operatingSystems);
        });
        
        it('rejects with error if driver-api-client call fails', function(){
            var error = { status: 404, error: 'FAIL' };
            
            sandbox 
                .stub(driverApiClient, 'get')
                .rejects(error);
            
            return operatingSystemRepo.get().should.eventually.be.rejectedWith(error)
        })
    });
});