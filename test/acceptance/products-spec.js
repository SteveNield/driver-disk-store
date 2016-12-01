var supertest = require('supertest'),
    sinon = require('sinon'),
    sinonAsPromised = require('sinon-as-promised'),
    driverApiClient = require('./../../server/data/driver-api-client');

describe('/products', function(){
    
    var server, request, sandbox;
    
    beforeEach(function(){
        server = require('./../../server');
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
            .stub(driverApiClient, 'get')
            .withArgs('/products/a/b/c')
            .resolves(product);
        
        request
            .get('/products/a/b/c')
            .expect(/\<h1\>test\-product\<\/h1\>/, done);
    });
});