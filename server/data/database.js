var mongoose = require('mongoose'),
    config = require('./../server.conf');

module.exports.connect = function(){
    if (mongoose.connection.readyState === 0)
        mongoose.connect(config.database.uri);
};

module.exports.disconnect = function(){
    mongoose.disconnect();
};
