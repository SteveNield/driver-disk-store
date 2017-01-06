var orderApi = require('./../../client/api/order-api'),
    CheckoutActions = require('./../../client/actions/checkout-actions'),
    httpClient = require('./../../lib/http-client'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    sinonAsPromised = require('sinon-as-promised'),
    assertPromise = require('./../assert-promise');

var should = chai.should();
chai.use(chaiAsPromised);

describe('order-api', function(){
  var sandbox,
      order,
      stubs;

  beforeEach(function(){
    sandbox = sinon.collection;

    order = {
      id: '123'
    }

    stubDependencies();
  })

  afterEach(function(){
    sandbox.restore();
  })

  function stubDependencies(){
    stubs = {
      httpClient: {}
    }

    stubs.httpClient.put = sandbox
      .stub(httpClient, 'put');
  }

  it('exists', function(){
    orderApi.should.exist;
  })
  describe('create', function(){
    it('calls put with correct URI and order', function(){
      orderApi.create(order);
      stubs.httpClient.put.should.have.been.calledWith('/api/order', order);
    })
  })
})
