var driverApiClient = require('./../../server/data/driver-api-client'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

var should = chai.should();
chai.use(chaiAsPromised);

var should = chai.should();

describe('driver-api-client', function(){
    it('exists', function(){
         driverApiClient.should.exist;
    });
    
    describe('/makes', function(){
        it('returns an array', function(){
            return driverApiClient.get('/makes').should.eventually.be.an('array');
        });
    });
    
    describe('/models', function(){
        it('returns an array', function(){
            return driverApiClient.get('/makes/34567/models', { makeId: '34567' }).should.eventually.be.an('array'); 
        });
    });
    
    describe('/operatingsystems', function(){
        it('returns an array', function(){
            return driverApiClient.get('/operatingsystems').should.eventually.be.an('array'); 
        });
    });
    
    describe('/products', function(){
        it('returns an array', function(){
            return driverApiClient.get('/products/12345/656/43322', {
                make: '12345', model: '656', operatingSystem: '43322'
            }).should.eventually.be.an('object'); 
        });
    });
});