var cartActions = require('./../../client/actions/cart'),
    cartEvents = require('./../../client/event-registry/cart'),
    Dispatcher = require('./../../client/dispatcher'),
    chai = require('chai'),
    sinon = require('sinon');

describe('cart-actions', function(){
  it('exists', function(){
    cartActions.should.exist;
  })

  var sandbox, handleAction;

  beforeEach(function(){
    sandbox = sinon.collection;
    handleAction = sandbox
      .stub(Dispatcher, 'handleAction');
  })

  afterEach(function(){
    sandbox.restore();
  })

  describe('receiveProduct', function(){
    it('should dispatch a new RECEIVE_DATA event with the supplied data', function(){
      var product = { id: '123' };
      cartActions.receiveProduct(product);
      handleAction.should.have.been.calledWith({
        actionType: cartEvents.RECEIVE_DATA,
        data: product
      })
    })
  })

  describe('receiveBasket', function(){
    it('should dispatch a new RECEIVE_BASKET event with the supplied data', function(){
      var basket = { id: '123' };
      cartActions.receiveBasket(basket);
      handleAction.should.have.been.calledWith({
        actionType: cartEvents.RECEIVE_BASKET,
        data: basket
      })
    })
  })

  describe('selectOption', function(){
    it('should dispatch a new SELECT_OPTION event with the supplied data', function(){
      var index = 1;
      cartActions.selectOption(index);
      handleAction.should.have.been.calledWith({
        actionType: cartEvents.SELECT_OPTION,
        index: index
      })
    })
  })

  describe('addToCart', function(){
    it('should dispatch a new CART_ADD event with the supplied data', function(){
      var sku = { id: '123' };
      cartActions.addToCart(sku);
      handleAction.should.have.been.calledWith({
        actionType: cartEvents.CART_ADD,
        sku: sku
      })
    })
  })
})
