var express = require('express'),
    React = require('react'),
    ReactDom = require('react-dom/server'),
    loggr = require('./../../lib/loggr'),
    uri = require('./../../lib/uri'),
    productRepository = require('./../repositories/product-repo'),
    ProductApp = require('./../../client/components/product-app.jsx'),
    Header = require('./../../client/components/header.jsx');

function buildMetaData(product){

  function buildTitle(){
    return product.make+' '+product.model+' Driver Disk for '+product.operatingSystem;
  }

  return {
    title: buildTitle()
  }
}

module.exports = function(app){
    var router = express.Router();

    router.get('/:make/:model/:operatingSystem', function(req,res,next){
      var make = uri.decodeArgument(req.params.make),
          model = uri.decodeArgument(req.params.model),
          operatingSystem = uri.decodeArgument(req.params.operatingSystem);

      productRepository.get(make, model, operatingSystem).then(function(product){
        if (!product){
          res.status(404).send();
        } else {
          try{
            res.render('product.ejs', {
                product: product,
                meta: buildMetaData(product)
            });
          } catch(err) {
            loggr.error(err);
            res.status(500).send();
          }
        }
      })
    });

    app.use('/product', router);
}
