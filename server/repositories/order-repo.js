var Order = require('./../models/Order');

module.exports.create = function(order){
  return new Promise(function(resolve, reject){
    Order.create(order, function(err, createdOrder){
      if(err){
        reject(err);
      } else {
        resolve(createdOrder);
      }
    })
  });
}
