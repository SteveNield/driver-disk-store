var basketApi = require('./../../client/api/basket-api'),
    httpClient = require('./../../lib/http-client'),
    CartActions = require('./../../client/actions/cart-actions'),
    cookieJar = require('./../../client/cookie-jar'),
    config = require('./../../client/api.conf'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    sinonAsPromised = require('sinon-as-promised'),
    assertPromise = require('./../assert-promise');

var should = chai.should();
chai.use(chaiAsPromised);

describe('basket-api', function(){
  var sandbox;

  beforeEach(function(){
    sandbox = sinon.collection;
  })

  afterEach(function(){
    sandbox.restore();
  })

  it('exists', function(){
    basketApi.should.exist;
  })
  describe('put', function(){
    it('calls put on the httpClient with correct URL', function(done){
      var basketId = '098098',
          sku = { id: 123 },
          expectedUrl = config.api.host+'/api/basket/098098/items',
          expectedBody = sku;

      var stub = sandbox
        .stub(httpClient, 'put')
        .resolves();

      basketApi.addSku(basketId, sku).then(function(){
        try{
          stub.should.have.been.calledWith(expectedUrl, expectedBody);
          done();
        } catch(err){
          done(err);
        }
      }, done)
    })
  })
  describe('get', function(){
    it('calls get on httpClient with correct URL and returns basket', function(){
      var basketId = '9875454',
          expectedUrl = config.api.host+'/api/basket/9875454',
          basket = { id: '93458798345' };

      var stub = sandbox
        .stub(httpClient, 'get')
        .withArgs(expectedUrl)
        .resolves(basket);

      return basketApi.get(basketId).should.eventually.equal(basket);
    })
  })
  describe('loadBasketData', function(){

    function stubReceiveBasketAction(){
      return sandbox
        .stub(CartActions, 'receiveBasket');
    }

    describe('when client basket cookie does not exist', function(){
      it('does not raise an action', function(done){
        var stub = stubReceiveBasketAction();

        sandbox
          .stub(cookieJar, 'get')
          .withArgs('basket')
          .returns();

        basketApi.loadBasketData().then(function(){
          try{
            stub.should.not.have.been.called;
            done();
          } catch(err){
            done(err);
          }
        }, done);
      })
    })
    describe('when client basket cookie exists', function(){

      function stubCookie(cookie){
        return sandbox
          .stub(cookieJar, 'get')
          .returns(cookie);
      }

      describe('when api returns valid basket', function(){
        it('raises receiveBasket action with basket', function(done){
          var stub = stubReceiveBasketAction(),
              basket = { id: 123987129387 };

          stubCookie('123');
          sandbox
            .stub(httpClient, 'get')
            .resolves(basket);

          assertPromise(basketApi.loadBasketData, function(){
            stub.should.have.been.calledWith(basket);
          }, done);
        })
      })
      describe('when api returns a 404 error', function(){
        var cookieJarRemove,
            receiveBasketAction,
            err;

        function setup(){
          cookieJarRemove = sandbox.stub(cookieJar, 'remove');
          err = { status: 404 };

          stubCookie('123');
          receiveBasketAction = stubReceiveBasketAction();

          sandbox
            .stub(httpClient, 'get')
            .rejects(err);
        }

        it('removes the client cookie', function(done){
          setup();

          assertPromise(basketApi.loadBasketData, function(){
            cookieJarRemove.should.have.been.calledWith('basket');
          }, done);
        })
        it('raises receibeBasket action with blank basket', function(done){
          setup();

          assertPromise(basketApi.loadBasketData, function(){
            receiveBasketAction.should.have.been.calledWith({});
          }, done);
        })
      })
      describe('when api returns an other error', function(){
        it('rejects with the error', function(){
          var err = { status: 500 };
          stubCookie('123');
          stubReceiveBasketAction();
          sandbox
            .stub(httpClient, 'get')
            .rejects(err);

          basketApi.loadBasketData().should.eventually.be.rejectedWith(err);
        })
      })
    })
  })
})
