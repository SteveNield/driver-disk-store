var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BasketItemSchema = new Schema({
  product: String,
  deliveryOption: String
});

module.exports = mongoose.model('Basket', new Schema({
  items: [BasketItemSchema]
}));
