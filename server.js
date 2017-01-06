require('node-jsx').install();
var express = require('express'),
    bodyParser = require('body-parser'),
    database = require('./server/data/database'),
    path = require('path');

var app = express();

database.connect();

app.set('port', process.env.PORT || 5558);
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);
app.use(express.static('static'));
app.use(bodyParser());

require('./server/routes/index')(app);
require('./server/routes/product')(app);
require('./server/routes/view-basket')(app);
require('./server/routes/checkout')(app);

require('./server/routes/api/makes')(app);
require('./server/routes/api/operating-systems')(app);
require('./server/routes/api/products')(app);
require('./server/routes/api/basket')(app);
require('./server/routes/api/delivery-options')(app);
require('./server/routes/api/order')(app);

var server = app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

server.quit = function(){
  database.disconnect();
  server.close();
}

module.exports = server;
