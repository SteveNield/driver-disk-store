var Dispatcher = require('./../dispatcher'),
    ProductSearchConstants = require('./../constants/product-search');

var productSearchActions = {
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
  selectMake: function(make){
    Dispatcher.handleAction({
      actionType: ProductSearchConstants.SELECT_MAKE,
      make: make
    })
  },
  selectModel: function(model){
    Dispatcher.handleAction({
      actionType: ProductSearchConstants.SELECT_MODEL,
      model: model
    })
  },
  selectOperatingSystem: function(operatingSystem){
    Dispatcher.handleAction({
      actionType: ProductSearchConstants.SELECT_OPERATING_SYSTEM,
      operatingSystem: operatingSystem
    })
  }
}

module.exports = productSearchActions;
