var supertest = require('supertest'),
    sinon = require('sinon'),
    sinonAsPromised = require('sinon-as-promised'),
    database = require('./../../../server/data/database');

describe('/api/products', function(){

    var server, request, sandbox;

    beforeEach(function(){
        server = require('./../../../server');
        request = supertest(server);
        sandbox = sinon.collection;
    });

    afterEach(function(){
        sandbox.restore();
        server.close();
    });

    it('returns 200', function(done){
        var product = {id:'123', description: 'test-product', price: 9.99};

        sandbox
            .stub(database, 'getProduct')
            .withArgs('a','b','c')
            .resolves(product);

        request
            .get('/api/products/a/b/c')
            .expect(200, done);
    });
});
