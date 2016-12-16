var productRepo = require('./../../server/repositories/product-repo'),
    database = require('./../../server/data/database'),
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
                        .stub(database, 'getProduct')
                        .withArgs('123','456','789')
                        .resolves(product);

                    sandbox.stub(currencyFormatter, 'format');

                    return productRepo.get('123', '456', '789').should.eventually.equal(product);
                });
                it('sets the display price', function(){
                    var product = { id: '123', price: 9.99 },
                        expectedProduct = { id: '123', price: 9.99, displayPrice: '£9.99' };

                    sandbox
                        .stub(database, 'getProduct')
                        .withArgs('123','456','789')
                        .resolves(product);

                    sandbox
                        .stub(currencyFormatter, 'format')
                        .withArgs('GBP', 9.99)
                        .returns('£9.99');

                    return productRepo.get('123','456','789').should.eventually.deep.equal(expectedProduct);
                });
            })

            describe('arguments are invalid', function(){
                describe('make is missing', function(){
                    it('rejects with error', function(){
                        sandbox
                            .stub(database, 'getProduct')
                            .resolves();

                        return productRepo.get(undefined, 'MODEL', 'OS').should.eventually.be.rejectedWith({
                            message: 'Make is missing'
                        });
                    });
                })

                describe('model is missing', function(){
                    it('rejects with error', function(){
                        sandbox
                            .stub(database, 'getProduct')
                            .resolves();

                        return productRepo.get('MAKE', undefined, 'OS').should.eventually.be.rejectedWith({
                            message: 'Model is missing'
                        });
                    });
                })

                describe('OS is missing', function(){
                    it('rejects with error', function(){
                        sandbox
                            .stub(database, 'getProduct')
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
