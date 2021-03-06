var supertest = require('supertest'),
    chai = require('chai'),
    sinonAsPromised = require('sinon-as-promised'),
    database = require('./../../setup/database'),
    productRepo = require('./../../../server/repositories/product-repo')
    sinon = require('sinon');

var should = chai.should();

describe('/makes/:id/models', function(){

    var server, request, sandbox, mock = [
        { id:"123", name:"aspire 5560" },
        { id:"123", name:"aspire 5560" },
        { id:"123", name:"aspire 5560" }];

    beforeEach(function(){
      database.setup();
      server = require('./../../../server');
      request = supertest(server);
      sandbox = sinon.collection;
    });

    afterEach(function(){
      database.tearDown();
      sandbox.restore();
      server.quit();
    });

    it('returns 200', function(done){
        sandbox
            .stub(productRepo, 'getModelsForMake')
            .withArgs('123')
            .resolves(mock);

        try{
            request
                .get('/api/makes/123/models')
                .expect(200, done);
        } catch(err) {
            done(err);
        }
    });

    it('returns makes from driver API', function(done){
        sandbox
            .stub(productRepo, 'getModelsForMake')
            .withArgs('123')
            .resolves(mock);

        try{
            request
                .get('/api/makes/123/models')
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
            .stub(productRepo, 'getModelsForMake')
            .withArgs('123')
            .rejects('FAILURE');

        try{
            request
                .get('/api/makes/123/models')
                .expect(500, done);
        } catch(err) {
            done(err);
        }
    });
});
