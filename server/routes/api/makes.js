var express = require('express'),
    productRepo = require('./../../repositories/product-repo'),
    loggr = require('./../../../lib/loggr');

function handleError(err){
}

module.exports = function(app){
    var router = express.Router();

    router.get('/', function(req,res){
      try{
        productRepo.getMakes().then(function(makes){
            res.json(makes);
        }, function(err){
          loggr.error(err);
          res.status(500).send();
        });
      } catch(err){
        loggr.error(err);
        res.status(500).send();
      }
    });

    router.get('/:make/models', function(req,res){
      try{
        productRepo.getModelsForMake(req.params.make).then(function(models){
            res.json(models);
        }, function(err){
          loggr.error(err);
          res.status(500).send();
        });
      } catch(err){
        loggr.error(err);
        res.status(500).send();
      }
    });

    app.use('/api/makes', router);
}
