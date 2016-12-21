module.exports = function(promise, assert, done){
  promise().then(function(args){
    try{
      assert(args);
      done();
    } catch(err){
      done(err);
    }
  }, done)
}
