var supertest = require('supertest'),
    chai = require('chai'),
    sinonAsPromised = require('sinon-as-promised'),
    driverApiClient = require('./../../server/data/driver-api-client'),
    sinon = require('sinon');

var should = chai.should();

describe('/makes/:id/models', function(){
    
    var server, request, sandbox, mock = [
        { id:"123", name:"aspire 5560" },
        { id:"123", name:"aspire 5560" },
        { id:"123", name:"aspire 5560" }];
    
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
            .withArgs('/makes/123/models')
            .resolves();
        
        try{
            request
                .get('/makes/123/models')
                .expect(200, done);
        } catch(err) {
            done(err);   
        }
    });
    
    it('returns makes from driver API', function(done){
        sandbox
            .stub(driverApiClient, 'get')
            .withArgs('/makes/123/models')
            .resolves(mock);
        
        try{
            request
                .get('/makes/123/models')
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
            .withArgs('/makes/123/models')
            .rejects('FAILURE');
        
        try{
            request
                .get('/makes/123/models')
                .expect(500, done);
        } catch(err) {
            done(err);
        }
    });
    
    it('returns 404 if make is not found', function(done){
        sandbox
            .stub(driverApiClient, 'get')
            .withArgs('/makes/123/models')
            .rejects({status: 404, err: 'NotFound'});
        
        try{
            request
                .get('/makes/123/models')
                .expect(404, done);
        } catch(err) {
            done(err);
        }
    });
});