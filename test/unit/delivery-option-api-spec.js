var deliveryOptionApi = require('./../../client/api/delivery-option-api'),
    BasketActions = require('./../../client/actions/basket-actions'),
    httpClient = require('./../../lib/http-client'),
    browser = require('./../../client/browser')
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    sinonAsPromised = require('sinon-as-promised'),
    assertPromise = require('./../assert-promise');

var should = chai.should();
chai.use(chaiAsPromised);

describe('delivery-option-api', function(){
  var sandbox;

  beforeEach(function(){
    sandbox = sinon.collection;
  })

  afterEach(function(){
    sandbox.restore();
  })

  it('exists', function(){
    deliveryOptionApi.should.exist;
  })
  describe('loadDeliveryOptions', function(done){
    it('loads options from API and raises new receiveOptions action', function(){
      var options = [{id:'123'}],
          receiveOptions = sandbox
            .stub(BasketActions, 'receiveOptions');

      sandbox
        .stub(httpClient, 'get')
        .resolves(options);

      assertPromise(deliveryOptionApi.loadDeliveryOptions, function(){
        receiveOptions.should.have.been.calledWith(options);
      }, done);
    })
  })
})
