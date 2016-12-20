var basketRepository = require('./../../server/repositories/basket-repo'),
    database = require('./../../server/data/database'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon');

var should = chai.should();
chai.use(chaiAsPromised);

describe('basketRepository', function(){
  it('exists', function(){
    basketRepository.should.exist;
  })

  var basket, basketItem, sandbox;

  beforeEach(function(){
    sandbox = sinon.collection;
    basket = {
      id: '123',
      items: []
    };
    basketItem = {
      sku: {
        product: '123',
        option: '456'
      },
      quantity: 1
    };
  })

  afterEach(function(){
    sandbox.restore();
  })

  describe('addItem', function(){
    it('exists', function(){
      basketRepository.addItem.should.exist;
    })
    describe('when instance of sku is already in basket', function(){
      it('updates quantity', function(done){
        basket.items.push(basketItem);

        sandbox
          .stub(database, 'getBasket')
          .withArgs('123')
          .resolves(basket);

        sandbox
          .stub(database, 'saveBasket')
          .resolves();

        basketRepository.addItem('123', basketItem.sku).then(function(){
          try{
            basket.items[0].quantity.should.equal(2);
            done();
          } catch(err){
            done(err);
          }
        });
      })
    })
    describe('when instance of sku is not already in basket', function(){
      it('creates a new basket item and adds to basket', function(){
        basket.items = [];

        sandbox
          .stub(database, 'getBasket')
          .withArgs('123')
          .resolves(basket);

        sandbox
          .stub(database, 'saveBasket')
          .resolves();

        basketRepository.addItem('123', basketItem.sku).then(function(){
          try{
            basket.items[0].should.deep.equal(basketItem);
            done();
          } catch(err){
            done(err);
          }
        })
      })
    })
  })

  describe('get', function(){
    it('exists', function(){
      basketRepository.get.should.exist;
    })
    it('gets the basket from the database', function(){
      var basket = {
        id: '123'
      }

      var stub = sandbox
        .stub(database, 'getBasket')
        .withArgs('123')
        .resolves(basket);

      basketRepository.get('123').should.eventually.equal(basket);
    })
  })
})
