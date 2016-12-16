var express = require('express'),
    React = require('react'),
    ReactDom = require('react-dom/server'),
    loggr = require('./../../lib/loggr'),
    productRepository = require('./../repositories/product-repo'),
    Product = require('./../../client/components/product.jsx'),
    Header = require('./../../client/components/header.jsx');

module.exports = function(app){
    var router = express.Router();

    router.get('/:makeId/:modelId/:operatingSystemId', function(req,res,next){
      productRepository.get(
        req.params.makeId,
        req.params.modelId,
        req.params.operatingSystemId
      ).then(function(product){
        if (!product){
          res.status(404).send();
        } else {
          try{
            res.render('product.ejs', {
                components: {
                  product: {
                    html: ReactDom.renderToStaticMarkup(React.createFactory(Product)({
                      product: product
                    })),
                    model: product
                  },
                  header: {
                    html: ReactDom.renderToStaticMarkup(React.createFactory(Header)({}))
                  }
                }
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
