var makeRepo = require('./../../server/repositories/make-repo'),
    database = require('./../../server/data/database'),
    sinon = require('sinon'),
    chai = require('chai'),
    sinonAsPromised = require('sinon-as-promised'),
    chaiAsPromised = require('chai-as-promised');

var should = chai.should();
chai.use(chaiAsPromised);

describe('make-repo', function(){
    it('exists', function(){
        makeRepo.should.exist;
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
            makeRepo.get.should.exist;
        });

        it('gets all makes from database', function(){
            var makes = [{ id: '123' },{ id: '345' }];

            sandbox
                .stub(database, 'getMakes')
                .resolves(makes);

            return makeRepo.get().should.eventually.equal(makes);
        });
    });
});
