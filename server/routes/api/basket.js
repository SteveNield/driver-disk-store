var express = require('express'),
    loggr = require('./../../../lib/loggr'),
    basketRepo = require('./../../repositories/basket-repo');

module.exports = function(app){
    var router = express.Router();

    router.get('/:id', function(req,res){
      basketRepo.get(req.params.id).then(function(basket){
        if(!basket){
          loggr.info('Basket 404 '+req.url);
          res.status(404).send();
        } else {
          res.json(basket);
        }
      }, function(err){
        loggr.error(err);
        res.status(500).send();
      })
    })

    router.put('', function(req,res){
      basketRepo.create().then(function(basket){
        res.json(basket);
      }, function(err){
        loggr.error(err);
        res.status(500).send();
      })
    })

    router.put('/:id/items', function(req,res){
      basketRepo.addSku(req.params.id, req.body).then(function(){
        res.send();
      }, function(err){
        loggr.error(err);
        res.status().send(err);
      });
    })

    app.use('/api/basket', router);
}
