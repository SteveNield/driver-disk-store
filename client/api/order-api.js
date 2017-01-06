var httpClient = require('./../../lib/http-client'),
    loggr = require('./../../lib/loggr'),
    config = require('./../api.conf');

module.exports.create = function(order){
  return httpClient.put('/api/order', order);
}
