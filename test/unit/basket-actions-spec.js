var BasketActions = require('./../../client/actions/basket-actions'),
    BasketConstants = require('./../../client/constants/basket-constants'),
    Dispatcher = require('./../../client/dispatcher'),
    chai = require('chai'),
    sinon = require('sinon');

describe('basket-actions', function(){
  it('exists', function(){
    BasketActions.should.exist;
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
      BasketActions.receiveProduct(product);
      handleAction.should.have.been.calledWith({
        actionType: BasketConstants.RECEIVE_DATA,
        data: product
      })
    })
  })

  describe('receiveBasket', function(){
    it('should dispatch a new RECEIVE_BASKET event with the supplied data', function(){
      var basket = { id: '123' };
      BasketActions.receiveBasket(basket);
      handleAction.should.have.been.calledWith({
        actionType: BasketConstants.RECEIVE_BASKET,
        data: basket
      })
    })
  })

  describe('selectOption', function(){
    it('should dispatch a new SELECT_OPTION event with the supplied data', function(){
      var index = 1;
      BasketActions.selectOption(index);
      handleAction.should.have.been.calledWith({
        actionType: BasketConstants.SELECT_OPTION,
        index: index
      })
    })
  })

  describe('addToCart', function(){
    it('should dispatch a new CART_ADD event with the supplied data', function(){
      var sku = { id: '123' };
      BasketActions.addToCart(sku);
      handleAction.should.have.been.calledWith({
        actionType: BasketConstants.CART_ADD,
        sku: sku
      })
    })
  })

  describe('receiveOptions', function(){
    it('should dispatch a new RECEIVE_OPTIONS event with the supplied data', function(){
      var options = [];
      BasketActions.receiveOptions(options);
      handleAction.should.have.been.calledWith({
        actionType: BasketConstants.RECEIVE_OPTIONS,
        options: options
      })
    })
  })

  describe('removeFromBasket', function(){
    it('should dispatch a new BASKET_REMOVE event with the supplied data', function(){
      var basketItemId = '123';
      BasketActions.removeFromBasket(basketItemId);
      handleAction.should.have.been.calledWith({
        actionType: BasketConstants.BASKET_REMOVE,
        basketItemId: basketItemId
      })
    })
  })
})
