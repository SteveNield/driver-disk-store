var ProductSearchStore = require('./../../client/stores/product-search-store'),
    chai = require('chai');

var should = chai.should();

describe('product-search-store', function(){
  it('exists', function(){
    ProductSearchStore.should.exist;
  })
  it('initializes with empty makes', function(){
    ProductSearchStore.getState().makes.should.deep.equal([]);
  })
})
