var productRepo = require('./../../server/repositories/product-repo'),
    driverApiClient = require('./../../server/data/driver-api-client'),
    currencyFormatter = require('./../../lib/currency-formatter'),
    sinon = require('sinon'),
    sinonAsPromised = require('sinon-as-promised'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

var should = chai.should();
chai.use(chaiAsPromised);

describe('product-repo', function(){
    it('exists', function(){
        productRepo.should.exist; 
    });
    
    var sandbox;
    
    beforeEach(function(){
        sandbox = sinon.collection; 
    });
    
    afterEach(function(){
        sandbox.restore(); 
    });
    
    describe('get', function(){
        it('exists', function(){
            productRepo.get.should.exist; 
        });
        
        describe('product is requested', function(){
            describe('product exists', function(){
                it('resolves with the product', function(){
                    var product = { id: '123' };

                    sandbox
                        .stub(driverApiClient, 'get')
                        .withArgs('/products/Acer/Aspire5570/WindowsXP')
                        .resolves(product);

                    sandbox.stub(currencyFormatter, 'format');

                    return productRepo.get('Acer', 'Aspire5570', 'WindowsXP').should.eventually.equal(product);
                });
                it('sets the display price', function(){
                    var product = { id: '123', price: 9.99 },
                        expectedProduct = { id: '123', price: 9.99, displayPrice: '£9.99' };

                    sandbox
                        .stub(driverApiClient, 'get')
                        .withArgs('/products/a/b/c')
                        .resolves(product);

                    sandbox
                        .stub(currencyFormatter, 'format')
                        .withArgs('GBP', 9.99)
                        .returns('£9.99');

                    return productRepo.get('a','b','c').should.eventually.deep.equal(expectedProduct);
                })
            })
            
            describe('product does not exist', function(){
                it('rejects with status 404', function(){
                    sandbox.stub(driverApiClient, 'get').resolves();
                    sandbox.stub(currencyFormatter, 'format');
                    
                    return productRepo.get('a','b','c').should.eventually.be.rejectedWith({status:404});
                })
            })
            
            describe('arguments are invalid', function(){
                describe('make is missing', function(){
                    it('rejects with error', function(){
                        sandbox
                            .stub(driverApiClient, 'get')
                            .resolves();

                        return productRepo.get(undefined, 'MODEL', 'OS').should.eventually.be.rejectedWith({ 
                            message: 'Make is missing' 
                        });
                    });
                })
                
                describe('model is missing', function(){
                    it('rejects with error', function(){
                        sandbox
                            .stub(driverApiClient, 'get')
                            .resolves();

                        return productRepo.get('MAKE', undefined, 'OS').should.eventually.be.rejectedWith({ 
                            message: 'Model is missing' 
                        });
                    });
                })
                
                describe('OS is missing', function(){
                    it('rejects with error', function(){
                        sandbox
                            .stub(driverApiClient, 'get')
                            .resolves();

                        return productRepo.get('MAKE', 'MODEL', undefined).should.eventually.be.rejectedWith({ 
                            message: 'Operating system is missing' 
                        });
                    });
                })
            })
        })  
    });
});