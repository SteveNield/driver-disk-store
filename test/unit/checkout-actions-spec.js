var CheckoutActions = require('./../../client/actions/checkout-actions'),
    Dispatcher = require('./../../client/dispatcher'),
    CheckoutConstants = require('./../../client/constants/checkout-constants'),
    chai = require('chai'),
    sinon = require('sinon');

var should = chai.should();

describe('checkout-actions', function(){
  var sandbox,
      handleAction;

  beforeEach(function(){
    sandbox = sinon.collection;

    handleAction = sandbox
      .stub(Dispatcher, 'handleAction');
  })

  afterEach(function(){
    sandbox.restore();
  })

  it('exists', function(){
    CheckoutActions.should.exist;
  })

  describe('createOrder', function(){
    it('should dispatch a new ORDER_CREATE event with the supplied data', function(){
      var order = { id: '123' };
      CheckoutActions.createOrder(order);
      handleAction.should.have.been.calledWith({
        actionType: CheckoutConstants.ORDER_CREATE,
        order: order
      })
    })
  })
})
