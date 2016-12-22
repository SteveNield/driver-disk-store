var productSearchApi = require('./../../client/api/product-search-api'),
    ProductSearchActions = require('./../../client/actions/product-search-actions'),
    httpClient = require('./../../lib/http-client'),
    chai = require('chai'),
    sinon = require('sinon'),
    assertPromise = require('./../assert-promise');

var should = chai.should;

describe('productSearchApi', function(){
  var sandbox,
      stubs,
      makes,
      operatingSystems,
      models;

  beforeEach(function(){
    sandbox = sinon.collection;
    stubs = stubDependencies();

    makes = [];
    operatingSystems = [];
    models = [];
  })

  afterEach(function(){
    sandbox.restore();
  })

  function stubDependencies(){
    var stubs = {
      productSearchActions: {},
      httpClient: {}
    };

    stubs.productSearchActions.receiveMakes = sandbox
      .stub(ProductSearchActions, 'receiveMakes');

    stubs.productSearchActions.receiveOperatingSystems = sandbox
      .stub(ProductSearchActions, 'receiveOperatingSystems');

    stubs.productSearchActions.receiveModels = sandbox
      .stub(ProductSearchActions, 'receiveModels');

    stubs.httpClient.get = sandbox
      .stub(httpClient, 'get');

    return stubs;
  }

  it('exists', function(){
    productSearchApi.should.exist;
  })
  describe('loadMakes', function(){
    it('exists', function(){
      productSearchApi.loadMakes.should.exist;
    })
    describe('when httpClient returns makes list', function(){
      it('raises receiveMakes action with retrieved makes', function(done){
        stubs.httpClient.get.resolves(makes);
        assertPromise(productSearchApi.loadMakes, function(){
          stubs.productSearchActions.receiveMakes.should.have.been.calledWith(makes)
        }, done);
      })
    })
  })
  describe('loadOperatingSystems', function(){
    it('exists', function(){
      productSearchApi.loadOperatingSystems.should.exist;
    })
    it('raises receiveOperatingSystems action with retrieved operatingSystems', function(done){
      stubs.httpClient.get.resolves(operatingSystems);
      assertPromise(productSearchApi.loadOperatingSystems, function(){
        stubs.productSearchActions.receiveOperatingSystems.should.have.been.calledWith(operatingSystems)
      }, done)
    })
  })
  describe('loadModels', function(){
    it('exists', function(){
      productSearchApi.loadModels.should.exist;
    })
    it('raises receiveModels action with retrieved models', function(done){
      stubs.httpClient.get.resolves(models);
      assertPromise(productSearchApi.loadModels, function(){
        stubs.productSearchActions.receiveModels.should.have.been.calledWith(models)
      }, done)
    })
  })
})
