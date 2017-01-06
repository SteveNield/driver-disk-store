var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = mongoose.model('DeliveryOption', new Schema({
  name: String,
  price: Number,
  image: String,
  delivered: Boolean,
  description: String,
  leadTimeInDays: Number
}, {
  collection: 'deliveryOptions'
}));
