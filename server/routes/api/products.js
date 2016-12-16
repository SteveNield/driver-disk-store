var express = require('express'),
    productRepo = require('./../../repositories/product-repo'),
    loggr = require('./../../../lib/loggr');

module.exports = function(app){
    var router = express.Router();

    router.get('/:make/:model/:operatingSystem', function(req,res){
      try{
        productRepo.get(req.params.make, req.params.model, req.params.operatingSystem).then(function(product){
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
