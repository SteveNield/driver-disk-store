var supertest = require('supertest'),
    database = require('./../setup/database');

describe('/', function(){

    var server, request;

    beforeEach(function(){
        database.setup();
        server = require('./../../server');
        request = supertest(server);
    });

    afterEach(function(){
        server.quit();
        database.tearDown();
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
