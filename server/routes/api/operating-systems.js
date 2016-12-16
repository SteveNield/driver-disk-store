var express = require('express'),
    operatingSystemRepo = require('./../../repositories/operating-system-repo'),
    loggr = require('./../../../lib/loggr');

module.exports = function(app){
    var router = express.Router();

    router.get('/', function(req,res){
        operatingSystemRepo.get().then(function(operatingSystems){
            res.json(operatingSystems);
        }, function(err){
            loggr.error('Error connecting to API:'+JSON.stringify(err));
            res.status(500).send();
        });
    });

    app.use('/api/operatingsystems', router);
}
