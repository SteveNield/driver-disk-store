var supertest = require('supertest');

describe('/product/make/model/operatingSystem', function(){

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
                .get('/product/12345/656/987')
                .expect(200, done);
        } catch(err) {
            done(err);
        }
    });

});
