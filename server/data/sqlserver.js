var sql = require('seriate');

var configIsSet = false;

function setConfig(){
  sql.setDefault({
    server: 'winter-driver-disk-store.database.windows.net',
    user: 'winter-admin',
    pwd: '',
    database: 'winter-driver-disk-store-integration'
  });
  configIsSet = true;
}

module.exports.execute = function(query, params){
  if(!configIsSet){
    setConfig();
  }

  return sql.execute({
    query: query,
    params: params
  });
}
