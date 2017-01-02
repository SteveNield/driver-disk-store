var DeliveryOption = require('./../models/DeliveryOption');

module.exports.get = function(){
  return new Promise(function(resolve, reject){
    DeliveryOption.find({}, function(err, deliveryOptions){
      if(err)
        reject(err);
      else {
        resolve(deliveryOptions)
      }
    })
  })
}
