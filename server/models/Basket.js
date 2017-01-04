var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BasketItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  deliveryOption: {
    type: Schema.Types.ObjectId,
    ref: 'DeliveryOption'
  }
});

module.exports = mongoose.model('Basket', new Schema({
  items: [BasketItemSchema]
}));
