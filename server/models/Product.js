var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = mongoose.model('Product', new Schema({
  longDescription: String,
  make: String,
  model: String,
  operatingSystem: String
}));
