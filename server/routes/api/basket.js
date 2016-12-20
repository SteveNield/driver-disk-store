var express = require('express'),
    loggr = require('./../../../lib/loggr'),
    basketRepo = require('./../../repositories/basket-repo');

module.exports = function(app){
    var router = express.Router();

    router.get('/:id', function(req,res){
      basketRepo.get(req.params.id).then(function(basket){
        res.json(basket);
      }, function(err){
        res.status(err.status).send(err);
      })
    });

    router.put('/:id/items', function(req,res){
      basketRepo.addItem(req.params.id, req.body.sku).then(function(basket){
        res.json(basket);
      }, function(err){
        res.status(err.status).send(err);
      });
    })

    app.use('/api/basket', router);
}
