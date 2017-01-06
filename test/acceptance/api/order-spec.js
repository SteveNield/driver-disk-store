var supertest = require('supertest'),
    orderRepo = require('./../../../server/repositories/order-repo'),
    sinon = require('sinon'),
    sinonAsPromised = require('sinon-as-promised'),
    database = require('./../../setup/database');
    chai = require('chai');

var should = chai.should();

describe('/api/order', function(){
    var server,
        request,
        sandbox,
        order;

    beforeEach(function(){
      database.setup();
      sandbox = sinon.collection;
      server = require('./../../../server');
      request = supertest(server);

      order = {
        id: '123'
      };
    });

    afterEach(function(){
      sandbox.restore();
      server.quit();
      database.tearDown();
    });
    describe('/', function(){
      describe('put', function(){
        it('creates a new order', function(done){
          var stub = sandbox
            .stub(orderRepo, 'create')
            .resolves();

          try{
              request
                .put('/api/order')
                .send(order)
                .end(function(err, res){
                  if(err)
                    done(err);

                  stub.should.have.been.calledWith(order);
                  done();
                });
          } catch(err) {
              done(err);
          }
        });
      })
    })
});
