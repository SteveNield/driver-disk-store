var chai = require('chai'),
    currencyFormatter = require('./../../lib/currency-formatter');

var should = chai.should();

describe('currency-formatter', function(){
    it('exists', function(){
        currencyFormatter.should.exist; 
    });
    
    describe('format', function(){
        it('formats price as specified currency', function(){
            currencyFormatter.format('GBP', 9.9).should.equal('£9.90');
        });
        
        it('returns #ERR# if specified currency is not supported', function(){
            currencyFormatter.format('NOT_SUPPORTED', 11.23).should.equal('#ERR#'); 
        });
    });
});