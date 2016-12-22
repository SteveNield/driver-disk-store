var Dispatcher = require('./../dispatcher'),
    ProductSearchConstants = require('./../constants/product-search');

var cartActions = {
  receiveMakes: function(makes){
    Dispatcher.handleAction({
      actionType: ProductSearchConstants.RECEIVE_MAKES,
      makes: makes
    })
  },
  receiveOperatingSystems: function(operatingSystems){
    Dispatcher.handleAction({
      actionType: ProductSearchConstants.RECEIVE_OPERATING_SYSTEMS,
      operatingSystems: operatingSystems
    })
  },
  receiveModels: function(models){
    Dispatcher.handleAction({
      actionType: ProductSearchConstants.RECEIVE_MODELS,
      models: models
    })
  },
  selectMake: function(makeId){
    Dispatcher.handleAction({
      actionType: ProductSearchConstants.SELECT_MAKE,
      makeId: makeId
    })
  },
  selectModel: function(modelId){
    Dispatcher.handleAction({
      actionType: ProductSearchConstants.SELECT_MODEL,
      modelId: modelId
    })
  },
  selectOperatingSystem: function(operatingSystemId){
    Dispatcher.handleAction({
      actionType: ProductSearchConstants.SELECT_OPERATING_SYSTEM,
      operatingSystemId: operatingSystemId
    })
  }
}

module.exports = cartActions;
