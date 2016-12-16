var express = require('express'),
    makeRepo = require('./../../repositories/make-repo'),
    modelRepo = require('./../../repositories/model-repo'),
    loggr = require('./../../../lib/loggr');

module.exports = function(app){
    var router = express.Router();

    router.get('/', function(req,res){
      try{
        makeRepo.get().then(function(makes){
            res.json(makes);
        }, function(err){
            loggr.error('Error connecting to API:'+JSON.stringify(err));
            res.status(500).send();
        });
      } catch(err){
        loggr.error(err);
        res.status(500).send();
      }
    });

    router.get('/:makeId/models', function(req,res){
      try{
        modelRepo.getWithMakeId(req.params.makeId).then(function(models){
            res.json(models);
        }, function(err){
            loggr.error('Error connecting to API:'+JSON.stringify(err));
            res.status(err.status === 404 ? 404 : 500).send();
        });
      } catch(err){
        loggr.error(err);
        res.status(500).send();
      }
    });

    app.use('/api/makes', router);
}
