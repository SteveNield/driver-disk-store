var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var addressSchema = new Schema({
  line1: String,
  line2: String,
  line3: String,
  line4: String,
  line5: String,
  country: String,
  postcode: String
})

var customerSchema = new Schema({
  firstName: String,
  lastName: String,
  emailAddress: String,
  billingAddress: addressSchema,
  deliveryAddress: addressSchema
});

module.exports = mongoose.model('Order', new Schema({
  basket: {
    type: Schema.Types.ObjectId,
    ref: 'Basket'
  },
  customer: customerSchema
}));
