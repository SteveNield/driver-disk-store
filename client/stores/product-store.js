var Dispatcher = require('./../dispatcher'),
    EventEmitter = require('events').EventEmitter,
    Events = require('./../event-registry/cart'),
    _ = require('underscore');

var product = {}, selected = null;

function loadProductData(data){
  product = data;
  selected = data.options[0];
}

function setSelected(index){
  selected = product.options[index];
}

var productStore = _.extend({}, EventEmitter.prototype, {
  getProduct: function(){
    return product;
  },
  getSelected: function(){
    return selected;
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
    case Events.RECEIVE_DATA:
      loadProductData(action.data);
      break;
    case Events.SELECT_OPTION:
      setSelected(action.index);
      break;
    default: return true;
  }
  productStore.emitChange();
  return true;
})

module.exports = productStore;
