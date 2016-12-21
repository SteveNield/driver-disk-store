var basketRepo = require('./../../server/repositories/basket-repo'),
    database = require('./../../server/data/database'),
    Basket = require('./../../server/models/Basket'),
    sinon = require('sinon'),
    sinonAsPromised = require('sinon-as-promised'),
    chai = require('chai');

var should = chai.should();

describe('basket-repo', function(){
  it('exists', function(){
    basketRepo.should.exist;
  })

  var sandbox, basket, sku;

  beforeEach(function(){
    sandbox = sinon.collection;
    basket = {};
    sku = {
      product: '111',
      option: '222'
    };
  })

  afterEach(function(){
    sandbox.restore();
  })

  describe('get', function(){
    it('retrieves the basket from the database', function(){
      sandbox
        .stub(database, 'getBasket')
        .withArgs('123')
        .resolves(basket);

      basketRepo.get('123').should.eventually.equal(basket);
    })
  })

  describe('addSku', function(){
    describe('when basket does not exist', function(){
      it('creates a new basket and saves to the database', function(done){
        var newBasket = new Basket('123');

        var stub = sandbox
          .stub(database, 'saveBasket')
          .resolves(newBasket);

        sandbox
          .stub(database, 'getBasket')
          .resolves();

        basketRepo.addSku('123', sku).then(function(){
          try{
            stub.should.have.been.calledWith(newBasket);
            done();
          } catch(err){
            done(err);
          }
        }, done)
      })
    })

    function testBasketItemQuantity(basketItemId, basket, quantity, done){
      sandbox
        .stub(database, 'getBasket')
        .resolves(basket);

      var stub = sandbox
        .stub(database, 'saveBasket')
        .resolves(basket);

      basketRepo.addSku('123', sku).then(function(basket){
        try{
          basket.items[basketItemId].quantity.should.equal(quantity);
          done();
        } catch(err){
          done(err);
        }
      }, done);
    }

    describe('when instance of sku is already in basket', function(){
      it('updates the quantity of the basket item', function(done){
        var basket = new Basket('123'),
            basketItemId = sku.product+sku.option;

        basket.items[basketItemId] = new BasketItem(basketItemId, sku.product, sku.option);

        testBasketItemQuantity(basketItemId, basket, 2, done);
      })
    })
    describe('when basket does not already contain sku', function(){
      it('adds the item and sets the quantity to 1', function(done){
        var basket = new Basket('123'),
            basketItemId = sku.product+sku.option;

        testBasketItemQuantity(basketItemId, basket, 1, done);
      })
    })
  })
})
