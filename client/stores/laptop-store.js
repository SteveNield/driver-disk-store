var eventHub = require('./../event-hub'),
    httpClient = require('./../../lib/http-client');

var state = {
    makes: [],
    models: [],
    operatingSystems: []
};

var changeListeners = [];

function logDataRequestFailure(err){
    console.log('Error loading makes: '+err.err+', Status: '+err.status);
}

function updateMakes(){
    httpClient.get('/api/makes').then(function(makes){
        state.makes = makes;
        publishUpdate();
    }, logDataRequestFailure);
}

function updateModels(makeId){
    httpClient.get('/api/makes/'+makeId+'/models').then(function(models){
        state.models = models;
        publishUpdate();
    }, logDataRequestFailure);
}

function updateOperatingSystems(){
    httpClient.get('/api/operatingsystems').then(function(operatingSystems){
        state.operatingSystems = operatingSystems;
        publishUpdate();
    }, logDataRequestFailure);
}

function publishUpdate(){
    changeListeners.map(function(listener){
        listener(state);
    });
}

module.exports.subscribe = function(callback){
    changeListeners.push(callback);
}

module.exports.getState = function(){
    return state;
}

module.exports.reinitialiseState = function(){
    state = {
        makes: [],
        models: [],
        operatingSystems: []
    }
}

module.exports.load = function(){
    updateMakes();
    updateOperatingSystems();

    eventHub.on('make-selected', function(makeId){
        updateModels(makeId);
    });
}
