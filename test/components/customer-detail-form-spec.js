require('./../dom-mock')('<html><body></body></html>');

var CustomerDetailForm = require('./../../client/components/customer-detail-form.jsx'),
    CheckoutActions = require('./../../client/actions/checkout-actions'),
    enzyme = require('enzyme'),
    chai = require('chai'),
    chaiEnzyme = require('chai-enzyme'),
    React = require('react'),
    ReactDom = require('react-dom'),
    jsdom = require('mocha-jsdom'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

chai.use(chaiEnzyme());
var expect = chai.expect;
chai.use(sinonChai);

describe('CustomerDetailForm', function(){

    var component,
        sandbox,
        basket,
        customer,
        stubs;

    beforeEach(function(){
        jsdom({skipWindowCheck: true});
        sandbox = sinon.collection;

        basket = {
          _id: '123'
        }

        customer = {
          firstName: 'first-name',
          lastName: 'last-name',
          emailAddress: 'email-address',
          billingAddress: {
            line1: 'line-1',
            line2: 'line-2',
            line3: '',
            line4: '',
            line5: '',
            country: 'country',
            postcode: 'postcode'
          },
          deliveryAddress: {
            line1: 'line-1',
            line2: 'line-2',
            line3: '',
            line4: '',
            line5: '',
            country: 'country',
            postcode: 'postcode'
          }
        }

        stubDependencies();
    })

    afterEach(function(){
      sandbox.restore();
    })

    function stubDependencies(){
      stubs = {
        CheckoutActions: {}
      };

      stubs.CheckoutActions.createOrder = sandbox
        .stub(CheckoutActions, 'createOrder');
    }

    function shallowRenderComponent(){
      component = enzyme.shallow(<CustomerDetailForm basket={basket} />);
    }

    function mountComponent(){
      component = enzyme.mount(<CustomerDetailForm basket={basket} />);
    }

    function populateFields(){
      component.find('#firstName').get(0).value = customer.firstName;
      component.find('#lastName').get(0).value = customer.lastName;
      component.find('#emailAddress').get(0).value = customer.emailAddress;
      component.find('#billingLine1').get(0).value = customer.billingAddress.line1;
      component.find('#billingLine2').get(0).value = customer.billingAddress.line2;
      component.find('#billingCountry').get(0).value = customer.billingAddress.country;
      component.find('#billingPostcode').get(0).value = customer.billingAddress.postcode;
      component.find('#deliveryLine1').get(0).value = customer.deliveryAddress.line1;
      component.find('#deliveryLine2').get(0).value = customer.deliveryAddress.line2;
      component.find('#deliveryCountry').get(0).value = customer.deliveryAddress.country;
      component.find('#deliveryPostcode').get(0).value = customer.deliveryAddress.postcode;
    }

    it('exists', function(){
      expect(CustomerDetailForm).to.exist;
    })
    it('renders', function(){
      shallowRenderComponent();
      expect(component).to.exist;
    })
    describe('when form is submitted', function(){
      it('raises createOrder action with customer and basketId', function(){
        mountComponent();
        populateFields();
        component.find('.submit-button').simulate('click');
        stubs.CheckoutActions.createOrder.should.have.been.calledWith({
          basket: basket._id,
          customer: customer
        });
      })
    })
});
