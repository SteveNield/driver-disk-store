var basketStore = require('./../../client/stores/basket-store'),
    chai = require('chai');

var should = chai.should();

describe('basket-store', function(){
  it('exists', function(){
    basketStore.should.exist;
  })
  it('initializes with empty basket', function(){
    basketStore.getBasket().should.deep.equal({});
  })
})
