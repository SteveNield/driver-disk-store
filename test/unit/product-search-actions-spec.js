var ProductSearchActions = require('./../../client/actions/product-search-actions'),
    ProductSearchConstants = require('./../../client/constants/product-search-constants'),
    Dispatcher = require('./../../client/dispatcher'),
    chai = require('chai'),
    sinon = require('sinon');

var should = chai.should();

describe('product-search-actions', function(){
  it('exists', function(){
    ProductSearchActions.should.exist;
  })

  var sandbox, handleAction;

  beforeEach(function(){
    sandbox = sinon.collection;
    handleAction = sandbox
      .stub(Dispatcher, 'handleAction');
  })

  afterEach(function(){
    sandbox.restore();
  })

  describe('receiveMakes', function(){
    it('should dispatch a new RECEIVE_MAKES event with the supplied data', function(){
      var makes = [];
      ProductSearchActions.receiveMakes(makes);
      handleAction.should.have.been.calledWith({
        actionType: ProductSearchConstants.RECEIVE_MAKES,
        makes: makes
      })
    })
  })

  describe('receiveOperatingSystems', function(){
    it('should dispatch a new RECEIVE_OPERATING_SYSTEMS event with the supplied data', function(){
      var operatingSystems = [];
      ProductSearchActions.receiveOperatingSystems(operatingSystems);
      handleAction.should.have.been.calledWith({
        actionType: ProductSearchConstants.RECEIVE_OPERATING_SYSTEMS,
        operatingSystems: operatingSystems
      })
    })
  })

  describe('receiveModels', function(){
    it('should dispatch a new RECEIVE_MODELS event with the supplied data', function(){
      var models = [];
      ProductSearchActions.receiveModels(models);
      handleAction.should.have.been.calledWith({
        actionType: ProductSearchConstants.RECEIVE_MODELS,
        models: models
      })
    })
  })

  describe('selectMake', function(){
    it('should dispatch a new SELECT_MAKE event with the supplied data', function(){
      var make = '123';
      ProductSearchActions.selectMake(make);
      handleAction.should.have.been.calledWith({
        actionType: ProductSearchConstants.SELECT_MAKE,
        make: make
      })
    })
  })

  describe('selectModel', function(){
    it('should dispatch a new SELECT_MODEL event with the supplied data', function(){
      var model = '123';
      ProductSearchActions.selectModel(model);
      handleAction.should.have.been.calledWith({
        actionType: ProductSearchConstants.SELECT_MODEL,
        model: model
      })
    })
  })

  describe('selectOperatingSystem', function(){
    it('should dispatch a new SELECT_OPERATING_SYSTEM event with the supplied data', function(){
      var operatingSystem = '123';
      ProductSearchActions.selectOperatingSystem(operatingSystem);
      handleAction.should.have.been.calledWith({
        actionType: ProductSearchConstants.SELECT_OPERATING_SYSTEM,
        operatingSystem: operatingSystem
      })
    })
  })
})
