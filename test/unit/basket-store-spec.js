var basketStore = require('./../../client/stores/basket-store'),
    cartEvents = require('./../../client/event-registry/cart'),
    chai = require('chai'),
    sinon = require('sinon');

var should = chai.should();

describe('basket-store', function(){
  var
    sandbox;

  beforeEach(function(){
    sandbox = sinon.collection;
  })

  afterEach(function(){
    sandbox.restore();
  })

  it('exists', function(){
    basketStore.should.exist;
  })
  it('initializes with empty basket', function(){
    basketStore.getBasket().should.deep.equal({});
  })
})
