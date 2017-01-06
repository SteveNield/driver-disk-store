var express = require('express'),
    loggr = require('./../../../lib/loggr'),
    orderRepo = require('./../../repositories/order-repo');

module.exports = function(app){
    var router = express.Router();

    router.put('', function(req,res){
      orderRepo.create(req.body).then(function(order){
        res.json(order);
      }, function(err){
        loggr.error(err);
        res.status(500).send();
      })
    })

    app.use('/api/order', router);
}
