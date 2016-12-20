var loggr = require('./../lib/loggr');

var registeredEvents = {};

module.exports.on = function(event, callback){
    if (!registeredEvents.hasOwnProperty(event)){
        registeredEvents[event] = [];
    }

    registeredEvents[event].push(callback);
}

module.exports.raise = function(event, arg){
    if(!registeredEvents.hasOwnProperty(event)){
        return loggr.error('Event '+event+' has no registered handlers')
    }

    registeredEvents[event].map(function(registeredEvent){
        registeredEvent(arg);
    });
}

module.exports.clear = function(){
  registeredEvents = {};
}
