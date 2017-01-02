var supertest = require('supertest'),
    chai = require('chai'),
    sinonAsPromised = require('sinon-as-promised'),
    database = require('./../../../server/data/database'),
    databaseSetup = require('./../../setup/database'),
    sinon = require('sinon');

var should = chai.should();

describe('/makes', function(){

    var server, request, sandbox, mock = [
        { id:"123", name:"acer" },
        { id:"123", name:"acer" },
        { id:"123", name:"acer" }];

    beforeEach(function(){
      databaseSetup.setup();
      server = require('./../../../server');
      request = supertest(server);
      sandbox = sinon.collection;
    });

    afterEach(function(){
      sandbox.restore();
      server.quit();
      databaseSetup.tearDown();
    });

    it('returns 200', function(done){
        sandbox
            .stub(database, 'getMakes')
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
            .stub(database, 'getMakes')
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
            .stub(database, 'getMakes')
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
