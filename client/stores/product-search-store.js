var Dispatcher = require('./../dispatcher'),
    EventEmitter = require('events').EventEmitter,
    ProductSearchConstants = require('./../constants/product-search'),
    ProductSearchApi = require('./../api/product-search-api'),
    loggr = require('./../../lib/loggr'),
    _ = require('underscore');

var state = {
  makes: [],
  models: [],
  operatingSystems: [],
  selected: {}
};

function setMakes(makes){
  state.makes = makes;
  productSearchStore.emitChange();
}

function setOperatingSystems(operatingSystems){
  state.operatingSystems = operatingSystems;
  productSearchStore.emitChange();
}

function setModels(models){
  state.models = models;
  productSearchStore.emitChange();
}

function selectMake(makeId){
  state.selected.make = makeId;
  ProductSearchApi.loadModels(makeId);
}

function selectModel(modelId){
  state.selected.model = modelId;
}

function selectOperatingSystem(operatingSystemId){
  state.selected.operatingSystem = operatingSystemId;
}

var productSearchStore = _.extend({}, EventEmitter.prototype, {
  emitChange: function(){
    this.emit('change')
  },
  addChangeListener: function(cb){
    this.on('change', cb);
  },
  getState: function(){
    return state;
  }
});

Dispatcher.register(function(payload){
  var action = payload.action;
  var text;
  switch(action.actionType){
    case ProductSearchConstants.RECEIVE_MAKES:
      setMakes(action.makes);
      break;
    case ProductSearchConstants.RECEIVE_OPERATING_SYSTEMS:
      setOperatingSystems(action.operatingSystems);
      break;
    case ProductSearchConstants.RECEIVE_MODELS:
      setModels(action.models);
      break;
    case ProductSearchConstants.SELECT_MAKE:
      selectMake(action.make);
      break;
    case ProductSearchConstants.SELECT_MODEL:
      selectModel(action.model);
      break;
    case ProductSearchConstants.SELECT_OPERATING_SYSTEM:
      selectOperatingSystem(action.operatingSystem);
      break;
    default: return true;
  }
  return true;
})

module.exports = productSearchStore;
