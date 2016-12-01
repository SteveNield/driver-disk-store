require('node-jsx').install();
var express = require('express'),
    path = require('path');

var app = express();

app.set('port', process.env.PORT || 5558);
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);
app.use(express.static('static'));

require('./server/routes/index')(app);
require('./server/routes/makes')(app);
require('./server/routes/operating-systems')(app);
require('./server/routes/products')(app);

var server = app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

module.exports = server;