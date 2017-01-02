var sinon = require('sinon'),
    database = require('./../../server/data/database');

var sandbox;

module.exports.setup = function(){
    sandbox = sinon.collection;
    sandbox.stub(database, 'connect');
    sandbox.stub(database, 'disconnect');
}

module.exports.tearDown = function(){
    sandbox.restore();
}
