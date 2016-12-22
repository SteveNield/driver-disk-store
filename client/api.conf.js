var config = {};
console.log('Environment: '+process.env)
config.api = {
  host: process.env.apiHost || 'http://localhost:5558'
}

module.exports = config;
