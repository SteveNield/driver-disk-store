var CartActions = require('./../../client/actions/cart-actions'),
    CartConstants = require('./../../client/constants/cart'),
    Dispatcher = require('./../../client/dispatcher'),
    chai = require('chai'),
    sinon = require('sinon');

describe('cart-actions', function(){
  it('exists', function(){
    CartActions.should.exist;
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
      CartActions.receiveProduct(product);
      handleAction.should.have.been.calledWith({
        actionType: CartConstants.RECEIVE_DATA,
        data: product
      })
    })
  })

  describe('receiveBasket', function(){
    it('should dispatch a new RECEIVE_BASKET event with the supplied data', function(){
      var basket = { id: '123' };
      CartActions.receiveBasket(basket);
      handleAction.should.have.been.calledWith({
        actionType: CartConstants.RECEIVE_BASKET,
        data: basket
      })
    })
  })

  describe('selectOption', function(){
    it('should dispatch a new SELECT_OPTION event with the supplied data', function(){
      var index = 1;
      CartActions.selectOption(index);
      handleAction.should.have.been.calledWith({
        actionType: CartConstants.SELECT_OPTION,
        index: index
      })
    })
  })

  describe('addToCart', function(){
    it('should dispatch a new CART_ADD event with the supplied data', function(){
      var sku = { id: '123' };
      CartActions.addToCart(sku);
      handleAction.should.have.been.calledWith({
        actionType: CartConstants.CART_ADD,
        sku: sku
      })
    })
  })

  describe('receiveOptions', function(){
    it('should dispatch a new RECEIVE_OPTIONS event with the supplied data', function(){
      var options = [];
      CartActions.receiveOptions(options);
      handleAction.should.have.been.calledWith({
        actionType: CartConstants.RECEIVE_OPTIONS,
        options: options
      })
    })
  })
})
