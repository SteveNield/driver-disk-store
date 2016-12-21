var productStore = require('./../../client/stores/product-store'),
    chai = require('chai');

var should = chai.should();

describe('product-store', function(){
  it('exists', function(){
    productStore.should.exist;
  })
  it('initializes with empty product', function(){
    productStore.getProduct().should.deep.equal({});
  })
  it('initializes with empty selected', function(){
    productStore.getSelected().should.deep.equal({});
  })
})
