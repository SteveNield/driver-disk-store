var Dispatcher = require('./../dispatcher'),
    EventEmitter = require('events').EventEmitter,
    BasketConstants = require('./../constants/basket-constants'),
    _ = require('underscore');

var product = {},
    options = [],
    selected = {};

function loadProductData(data){
  product = data;
}

function setSelected(index){
  selected = options[index];
}

function setOptions(newOptions){
  options = newOptions;
  setSelected(0);
}

var productStore = _.extend({}, EventEmitter.prototype, {
  getProduct: function(){
    return product;
  },
  getSelected: function(){
    return selected;
  },
  getOptions: function(){
    return options;
  },
  emitChange: function(){
    this.emit('change');
  },
  addChangeListener: function(cb){
    this.on('change', cb);
  }
})

Dispatcher.register(function(payload){
  var action = payload.action;
  var text;
  switch(action.actionType){
    case BasketConstants.RECEIVE_DATA:
      loadProductData(action.data);
      break;
    case BasketConstants.SELECT_OPTION:
      setSelected(action.index);
      break;
    case BasketConstants.RECEIVE_OPTIONS:
      setOptions(action.options);
      break;
    default: return true;
  }
  productStore.emitChange();
  return true;
})

module.exports = productStore;
