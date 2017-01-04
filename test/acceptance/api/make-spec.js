var supertest = require('supertest'),
    chai = require('chai'),
    sinonAsPromised = require('sinon-as-promised'),
    productRepo = require('./../../../server/repositories/product-repo'),
    database = require('./../../setup/database'),
    sinon = require('sinon');

var should = chai.should();

describe('/makes', function(){

    var server, request, sandbox, mock = [
        { id:"123", name:"acer" },
        { id:"123", name:"acer" },
        { id:"123", name:"acer" }];

    beforeEach(function(){
      database.setup();
      server = require('./../../../server');
      request = supertest(server);
      sandbox = sinon.collection;
    });

    afterEach(function(){
      sandbox.restore();
      server.quit();
      database.tearDown();
    });

    it('returns 200', function(done){
        sandbox
            .stub(productRepo, 'getMakes')
            .resolves(mock);

        try{
            request
                .get('/api/makes')
                .expect(200, done);
        } catch(err) {
            done(err);
        }
    });

    it('returns makes from driver API', function(done){
        sandbox
            .stub(productRepo, 'getMakes')
            .resolves(mock);

        try{
            request
                .get('/api/makes')
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
            .stub(productRepo, 'getMakes')
            .rejects('FAILURE');

        try{
            request
                .get('/api/makes')
                .expect(500, done);
        } catch(err) {
            done(err);
        }
    });

});
