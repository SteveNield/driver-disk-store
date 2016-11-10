var supertest = require('supertest');

describe('/', function(){
    
    var server, request;
    
    beforeEach(function(){
        server = require('./../../server');
        request = supertest(server);
    });
    
    afterEach(function(){
        server.close(); 
    });
    
    it('returns 200', function(done){
        try{
            request
                .get('/')
                .expect(200, done);
        } catch(err) {
            done(err);   
        }
    });
    
});