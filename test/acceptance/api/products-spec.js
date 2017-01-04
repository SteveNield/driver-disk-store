var supertest = require('supertest'),
    sinon = require('sinon'),
    sinonAsPromised = require('sinon-as-promised'),
    productRepo = require('./../../../server/repositories/product-repo'),
    database = require('./../../setup/database');

describe('/api/products', function(){

    var server, request, sandbox;

    beforeEach(function(){
      database.setup();
      server = require('./../../../server');
      request = supertest(server);
      sandbox = sinon.collection;
    });

    afterEach(function(){
      sandbox.restore();
      server.quit();
      database.tearDown();
    });

    it('returns 200', function(done){
        var product = {id:'123', description: 'test-product', price: 9.99};

        sandbox
            .stub(productRepo, 'get')
            .withArgs('a','b','c')
            .resolves(product);

        request
            .get('/api/products/a/b/c')
            .expect(200, done);
    });
});
