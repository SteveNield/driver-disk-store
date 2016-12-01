var express = require('express'),
    React = require('react'),
    ReactDom = require('react-dom/server'),
    SearchForm = require('./../../client/components/search-form.jsx');

module.exports = function(app){
    var router = express.Router();
    
    router.get('', function(req,res,next){
        res.render('index.ejs', {
            searchForm: ReactDom.renderToStaticMarkup(React.createFactory(SearchForm)({}))
        });
    });
    
    app.use('/', router);
}