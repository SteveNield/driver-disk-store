var database = require('./../../server/data/database'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

var should = chai.should();
chai.use(chaiAsPromised);

describe('database', function(){
  it('exists', function(){
    database.should.exist;
  })
  describe('getProduct', function(){
    it('populates the options', function(){
      database.getProduct('12345','656','987').should.eventually.have.property("options");
    })
  })
})
