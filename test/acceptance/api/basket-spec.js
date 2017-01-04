var supertest = require('supertest'),
    basketRepo = require('./../../../server/repositories/basket-repo'),
    sinon = require('sinon'),
    sinonAsPromised = require('sinon-as-promised'),
    database = require('./../../setup/database');
    chai = require('chai');

var should = chai.should();

describe('/api/basket', function(){
    var server, request, sandbox;

    beforeEach(function(){
      database.setup();
      sandbox = sinon.collection;
      server = require('./../../../server');
      request = supertest(server);
    });

    afterEach(function(){
      sandbox.restore();
      server.quit();
      database.tearDown();
    });
    describe('/:id', function(){
      describe('get', function(){
        it('returns correct basket', function(done){
          var stub = sandbox
            .stub(basketRepo, 'get')
            .resolves();

          try{
              request
                .get('/api/basket/123')
                .end(function(err, res){
                  if(err)
                    done(err);

                  stub.should.have.been.calledWith('123');
                  done();
                });
          } catch(err) {
              done(err);
          }
        });
      });
      describe('/items', function(){
        describe('put', function(){
          it('returns correct basket', function(done){
            var stub = sandbox
              .stub(basketRepo, 'addSku')
              .resolves();

            var sku = {
              product: '123',
              option: '789'
            }

            try{
                request
                  .put('/api/basket/123/items')
                  .send(sku)
                  .end(function(err, res){
                    if(err)
                      done(err);

                    stub.should.have.been.calledWith('123', sku);
                    done();
                  });
            } catch(err) {
                done(err);
            }
          });
        })
        describe('delete', function(){
          it('calls remove on basketRepo', function(done){
            var stub = sandbox
              .stub(basketRepo, 'removeItem')
              .resolves();

            var basketId = '123',
                basketItemId = '567';

            try{
              request
                .delete('/api/basket/123/items/567')
                .end(function(err, res){
                  if(err)
                    done(err);

                  stub.should.have.been.calledWith('123', '567');
                  done();
                })
            } catch(err){
              done(err);
            }
          })
        })
      })
    })
});
