var express = require('express'),
    productRepo = require('./../../repositories/product-repo'),
    uri = require('./../../../lib/uri'),
    loggr = require('./../../../lib/loggr');

module.exports = function(app){
    var router = express.Router();

    router.get('/:make/:model/:operatingSystem', function(req,res){
      var make = uri.decodeArgument(req.params.make),
          model = uri.decodeArgument(req.params.model),
          operatingSystem = uri.decodeArgument(req.params.operatingSystem);

      try{
        productRepo.get(make, model, operatingSystem).then(function(product){
            res.json(product)
        }, function(err){
            loggr.error(err);
            res.status(err.status).send();
        });
      } catch(err){
        loggr.error(err);
        res.status(500).send();
      }
    });

    app.use('/api/products', router);
}
