var supertest = require('supertest'),
    chai = require('chai'),
    sinonAsPromised = require('sinon-as-promised'),
    driverApiClient = require('./../../server/data/driver-api-client'),
    sinon = require('sinon');

var should = chai.should();

describe('/makes', function(){
    
    var server, request, sandbox, mock = [
        { id:"123", name:"acer" },
        { id:"123", name:"acer" },
        { id:"123", name:"acer" }];
    
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
            .withArgs('/makes')
            .resolves();
        
        try{
            request
                .get('/makes')
                .expect(200, done);
        } catch(err) {
            done(err);   
        }
    });
    
    it('returns makes from driver API', function(done){
        sandbox
            .stub(driverApiClient, 'get')
            .withArgs('/makes')
            .resolves(mock);
        
        try{
            request
                .get('/makes')
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
            .withArgs('/makes')
            .rejects('FAILURE');
        
        try{
            request
                .get('/makes')
                .expect(500, done);
        } catch(err) {
            done(err);
        }
    });
    
});