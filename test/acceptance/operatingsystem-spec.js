var supertest = require('supertest'),
    chai = require('chai'),
    sinonAsPromised = require('sinon-as-promised'),
    driverApiClient = require('./../../server/data/driver-api-client'),
    sinon = require('sinon');

var should = chai.should();

describe('/operatingsystems', function(){
    
    var server, request, sandbox, mock = [
        { id:"123", name:"Windows 7" },
        { id:"123", name:"Windows 8" },
        { id:"123", name:"Windows 10" }];
    
    beforeEach(function(){
        server = require('./../../server');
        request = supertest(server);
        sandbox = sinon.collection;
    });
    
    afterEach(function(){
        sandbox.restore();
        server.close(); 
    });
    
    it('returns 200', function(done){
        sandbox
            .stub(driverApiClient, 'get')
            .withArgs('/operatingsystems')
            .resolves();
        
        try{
            request
                .get('/operatingsystems')
                .expect(200, done);
        } catch(err) {
            done(err);   
        }
    });
    
    it('returns opreating systems from driver API', function(done){
        sandbox
            .stub(driverApiClient, 'get')
            .withArgs('/operatingsystems')
            .resolves(mock);
        
        try{
            request
                .get('/operatingsystems')
                .end(function(err,res){
                    if(err)
                        done(err);
                    
                    JSON.parse(res.text).should.deep.equal(mock);
                    done();
                });
        } catch(err) {
            done(err);
        }
    });
    
    it('returns 500 if driver API call fails', function(done){
        sandbox
            .stub(driverApiClient, 'get')
            .withArgs('/operatingsystems')
            .rejects('FAILURE');
        
        try{
            request
                .get('/operatingsystems')
                .expect(500, done);
        } catch(err) {
            done(err);
        }
    });
    
});