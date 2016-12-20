var basketStore = require('./../../client/stores/basket-store'),
    eventHub = require('./../../client/event-hub'),
    httpClient = require('./../../lib/http-client'),
    cookieJar = require('./../../client/cookie-jar'),
    uuid = require('uuid'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonAsPromised = require('sinon-as-promised'),
    config = require('./../../client/api.conf');

var should = chai.should();

describe('basket-store', function(){
  var storedBasket,
      basketItem,
      product,
      option,
      sandbox;

  beforeEach(function(){
    sandbox = sinon.collection;

    product = {
      id: '123'
    };

    option = {
      id: '456'
    }

    storedBasket = {
      id: '789'
    },

    basketItem = {
      product: product.id,
      option: option.id
    }
  })

  afterEach(function(){
    sandbox.restore();
    basketStore.initialiseState();
    eventHub.clear();
  })

  function stubBasketCookie(id){
    sandbox
      .stub(cookieJar, 'get')
      .withArgs('basket')
      .returns(id);
  }

  function stubBasketPut(){
    sandbox
      .stub(httpClient, 'put')
      .resolves(storedBasket);
  }

  it('exists', function(){
    basketStore.should.exist;
  })
  describe('on load', function(){
    describe('when basket cookie exists', function(){
      it('loads basket from server', function(done){
        stubBasketCookie(123456);

        var stub = sandbox
          .stub(httpClient, 'get')
          .withArgs(config.api.host+'/api/basket/123456')
          .resolves(storedBasket);

        basketStore.load().then(function(){
          try{
            basketStore.getState().basket.should.deep.equal(storedBasket);
            done();
          } catch(err){
            done(err);
          }
        }, function(err){
          done(err);
        });
      })
    })
    describe('when the basket cookie does not exist', function(){
      it('creates an empty basket', function(done){
        stubBasketCookie();

        sandbox
          .stub(uuid, 'v1')
          .returns('12345');

        basketStore.load().then(function(){
          try{
            basketStore.getState().basket.should.deep.equal({ id: '12345', items: [] });
            done();
          } catch(err){
            done(err);
          }
        }, function(err){
          done(err);
        })
      })
    })
  })
  describe('when add-to-basket event is raised', function(){
    describe('when cookies does not exist', function(){
      it('generates and sets a new ID', function(done){
        stubBasketCookie();

        stubBasketPut();

        sandbox
          .stub(uuid, 'v1')
          .returns('12345');

        basketStore.load().then(function(){
          eventHub.raise('add-to-basket', basketItem);

          try{
            basketStore.getState().basket.id.should.equal('12345');
            done();
          } catch(err){
            done(err);
          }
        })
      })
      it('sets the basket ID in a cookie', function(done){
        stubBasketCookie();

        stubBasketPut();

        var stub = sandbox
          .stub(cookieJar, 'add');

        sandbox
          .stub(uuid, 'v1')
          .returns('12345');

        basketStore.load().then(function(){
          eventHub.raise('add-to-basket', basketItem);

          try{
            stub.should.have.been.calledWith('basket', '12345', { expires: Infinity});
            done();
          } catch(err){
            done(err);
          }
        })
      })
    })
    it('updates the basket on the server', function(done){
        stubBasketCookie();

        var stub = sandbox
          .stub(httpClient, 'put')
          .resolves(storedBasket);

        sandbox
          .stub(uuid, 'v1')
          .returns('12345');

        basketStore.load().then(function(){
          try{
            eventHub.raise('add-to-basket', basketItem);
            stub.should.have.been.called;
            done();
          } catch(err){
            done(err);
          }
        }, done)
    })
    describe('when basket has been updated', function(done){
      it('published update', function(){
        stubBasketCookie();

        stubBasketPut();

        var stub = sandbox.stub();

        basketStore.subscribe(stub);

        basketStore.load().then(function(){
          try{
            eventHub.raise('add-to-basket', basketItem);
            stub.should.have.been.called;
            done();
          } catch(err){
            done(err);
          }
        })
      })
    })
   })
})
