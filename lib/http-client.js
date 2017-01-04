var request = require('superagent');

function readResponse(res){
  return (res.text) ? JSON.parse(res.text) : undefined;
}

module.exports.get = function(uri){
    return new Promise(function(resolve,reject){
        try{
            request
                .get(uri)
                .end(function(err,res){
                    if(err)
                        reject({
                            status: res.status,
                            error: err
                        });
                    else{
                        resolve(readResponse(res));
                    }
                })
        } catch(err) {
            reject({
                err:err,
                status:500
            });
        }
    });
};

module.exports.put = function(uri, body){
  return new Promise(function(resolve, reject){
    try{
      request
        .put(uri)
        .send(body)
        .end(function(err,res){
          if(err){
            reject({
              status: res.status,
              error: err,
              uri: uri
            })
          } else {
            resolve(readResponse(res));
          }
        })
    } catch(err){
      reject({
        status: 500,
        error: err
      })
    }
  })
}

module.exports.delete = function(uri){
  return new Promise(function(resolve,reject){
      try{
          request
              .delete(uri)
              .end(function(err,res){
                  if(err)
                      reject({
                          status: res.status,
                          error: err
                      });
                  else{
                      resolve(readResponse(res));
                  }
              })
      } catch(err) {
          reject({
              err:err,
              status:500
          });
      }
  });
}
