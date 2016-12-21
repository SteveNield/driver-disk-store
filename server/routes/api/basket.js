var express = require('express'),
    loggr = require('./../../../lib/loggr'),
    basketRepo = require('./../../repositories/basket-repo');

module.exports = function(app){
    var router = express.Router();

    router.get('/:id', function(req,res){
      basketRepo.get(req.params.id).then(function(basket){
        if(!basket){
          res.status(400).send('Basket not found');
        } else {
          res.json(basket);
        }
      }, function(err){
        res.status(500).send(err);
      })
    });

    router.put('/:id/items', function(req,res){
      basketRepo.addSku(req.params.id, req.body.sku).then(function(){
        res.send();
      }, function(err){
        res.status(err.status).send(err);
      });
    })

    app.use('/api/basket', router);
}
