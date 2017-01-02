var express = require('express'),
    deliveryOptionRepo = require('./../../repositories/delivery-option-repo'),
    loggr = require('./../../../lib/loggr');

module.exports = function(app){
  var router = express.Router();

  router.get('/', function(req,res){
    deliveryOptionRepo.get().then(function(deliveryOptions){
      res.json(deliveryOptions);
    }, function(err){
      loggr.error(err);
      res.status(500).send();
    });
  });

  app.use('/api/deliveryoptions', router);
}
