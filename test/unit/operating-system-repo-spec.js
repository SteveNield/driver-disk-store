var operatingSystemRepo = require('./../../server/repositories/operating-system-repo'),
    database = require('./../../server/data/database'),
    sinon = require('sinon'),
    chai = require('chai'),
    sinonAsPromised = require('sinon-as-promised'),
    chaiAsPromised = require('chai-as-promised');

var should = chai.should();
chai.use(chaiAsPromised);

describe('operating-system-repo', function(){
    it('exists', function(){
        operatingSystemRepo.should.exist;
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
            operatingSystemRepo.get.should.exist;
        });

        it('gets all operating systems from database', function(){
            var operatingSystems = [{ id: '123' },{ id: '345' }];

            sandbox
                .stub(database, 'getOperatingSystems')
                .resolves(operatingSystems);

            return operatingSystemRepo.get().should.eventually.equal(operatingSystems);
        });
    });
});
