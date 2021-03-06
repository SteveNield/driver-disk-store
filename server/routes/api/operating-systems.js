var express = require('express'),
    productRepo = require('./../../repositories/product-repo'),
    loggr = require('./../../../lib/loggr');

module.exports = function(app){
  var router = express.Router();

  router.get('/', function(req,res){
    productRepo.getOperatingSystems().then(function(operatingSystems){
      res.json(operatingSystems);
    }, function(err){
      loggr.error(err);
      res.status(500).send();
    });
  });

  app.use('/api/operatingsystems', router);
}
