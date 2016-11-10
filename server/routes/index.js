var express = require('express');

module.exports = function(app){
    var router = express.Router();

    router.get('', function(req,res,next){
        res.render('index.ejs', {});
    });
    
    app.use('/', router);
}