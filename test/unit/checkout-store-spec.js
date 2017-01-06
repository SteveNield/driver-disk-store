var CheckoutStore = require('./../../client/stores/checkout-store'),
    chai = require('chai');

var should = chai.should();

describe('checkout-store', function(){
  it('exists', function(){
    CheckoutStore.should.exist;
  })
})
