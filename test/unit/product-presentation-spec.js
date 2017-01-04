var productPresentation = require('./../../client/presentation/product-presentation'),
    chai = require('chai');

var should = chai.should();

describe('product-presentation', function(){
  var product,
      option;

  beforeEach(function(){
    product = {};
    option = {};
  })

  it('exists', function(){
    productPresentation.should.exist;
  })
  describe('getTitle', function(){
    it('correctly formats the title', function(){
      product.make = 'Acer';
      product.model = '5580';
      product.operatingSystem = 'Windows XP';
      option.name = 'DVD';

      productPresentation.getTitle(product, option).should.equal('Acer 5580 Driver Disk on DVD for Windows XP');
    })
  })
})
