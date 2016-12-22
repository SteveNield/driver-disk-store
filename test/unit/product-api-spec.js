var productApi = require('./../../client/api/product-api'),
    CartActions = require('./../../client/actions/cart-actions'),
    browser = require('./../../client/browser')
    chai = require('chai'),
    sinon = require('sinon');

var should = chai.should();

describe('product-api', function(){
  var sandbox;

  beforeEach(function(){
    sandbox = sinon.collection;
  })

  afterEach(function(){
    sandbox.restore();
  })

  it('exists', function(){
    productApi.should.exist;
  })
  describe('loadProductData', function(){
    it('raises receiveProduct action with product from global scope', function(){
      var product = { id: 23 },
          receiveProduct = sandbox
            .stub(CartActions, 'receiveProduct');

      sandbox
        .stub(browser, 'globals')
        .returns({ product: product });

      productApi.loadProductData();

      receiveProduct.should.have.been.calledWith(product);
    })
  })
})
