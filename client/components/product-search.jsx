var React = require('react'),
    DropDown = require('./drop-down.jsx'),
    ProductSearchActions = require('./../actions/product-search-actions'),
    browser = require('./../browser');

module.exports = React.createClass({
  onMakeSelected: function(event){
    ProductSearchActions.selectMake(event.target.value);
  },
  onModelSelected: function(event){
    ProductSearchActions.selectModel(event.target.value);
  },
  onOperatingSystemSelected: function(event){
    ProductSearchActions.selectOperatingSystem(event.target.value);
  },
  submit: function(){
    browser.redirect(
      '/product/'+
      this.props.selected.make+'/'+
      this.props.selected.model+'/'+
      this.props.selected.operatingSystem)
  },
  render: function(){
    return (<div className="search-form-container">
              <div className="search-form">
                <div className="search-form-inner">
                  <div className="title">Specify Your PC and OS Version</div>
                  <form>
                    <DropDown label="Make" items={this.props.makes} onChange={this.onMakeSelected} />
                    <DropDown label="Model" items={this.props.models} emptyMessage="Select a Make" onChange={this.onModelSelected} />
                    <DropDown label="OS" items={this.props.operatingSystems} onChange={this.onOperatingSystemSelected} />
                  </form>
                  <div className="search-element">
                    <button className="btn btn-default submit-button" onClick={this.submit}>
                        Find Your Drivers
                    </button>
                  </div>
                </div>
              </div>
            </div>);
  }
})
