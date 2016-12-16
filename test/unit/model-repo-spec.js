var modelRepo = require('./../../server/repositories/model-repo'),
    database = require('./../../server/data/database'),
    sinon = require('sinon'),
    chai = require('chai'),
    sinonAsPromised = require('sinon-as-promised'),
    chaiAsPromised = require('chai-as-promised');

var should = chai.should();
chai.use(chaiAsPromised);

describe('model-repo', function(){
    it('exists', function(){
        modelRepo.should.exist;
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
            modelRepo.getWithMakeId.should.exist;
        });

        it('gets all models for a make from database', function(){
            var models = [{ id: '123' },{ id: '345' }];

            sandbox
                .stub(database, 'getModels')
                .withArgs('123')
                .resolves(models);

            return modelRepo.getWithMakeId('123').should.eventually.equal(models);
        });

        it('rejects with error if makeId is missing', function(){
            sandbox
                .stub(database, 'getModels')
                .resolves();

            return modelRepo.getWithMakeId().should.eventually.be.rejectedWith({ message: 'MakeId not specified' });
        });
    });
});
