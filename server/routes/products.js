var express = require('express'),
    productRepo = require('./../repositories/product-repo'),
    loggr = require('./../../lib/loggr');

module.exports = function(app){
    var router = express.Router();
    
    router.get('/:make/:model/:operatingSystem', function(req,res){
        productRepo.get(req.params.make, req.params.model, req.params.operatingSystem).then(function(product){
            res.render('product.ejs', {
                product: product
            })
        }, function(err){
            loggr.error(err);
            res.status(err.status).send();
        });
    });
    
    app.use('/products', router);
}