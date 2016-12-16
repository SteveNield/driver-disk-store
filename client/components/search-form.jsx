var React = require('react'),
    ReactDOM = require('react-dom'),
    DropDown = require('./drop-down.jsx'),
    laptopStore = require('./../stores/laptop-store'),
    eventHub = require('./../event-hub'),
    browser = require('./../browser');

module.exports = React.createClass({
    getInitialState: function(){
        return laptopStore.getState();
    },
    componentDidMount: function(){
        var component = this;
        laptopStore.subscribe(function(state){
            component.setState(state);
        });
    },
    selectMake: function(event){
        event.preventDefault();
        var make = event.target.value;
        this.setState({
            selectedMake: make,
            makeIsValid: true
        });
        eventHub.raise('make-selected', make);
    },
    selectModel: function(event){
        event.preventDefault();
        this.setState({
            selectedModel: event.target.value,
            modelIsValid: true
        });
    },
    selectOperatingSystem: function(event){
        event.preventDefault();
        this.setState({
            selectedOperatingSystem: event.target.value,
            operatingSystemIsValid: true
        });
    },
    isFormValid: function(){
        if (this.state.selectedMake !== undefined &&
            this.state.selectedModel !== undefined &&
            this.state.selectedOperatingSystem !== undefined){
            return true;
        } else {
            return false;
        }
    },
    submit: function(event){
        event.preventDefault();
        var make = this.state.selectedMake,
            model = this.state.selectedModel,
            operatingSystem = this.state.selectedOperatingSystem;

        if (this.isFormValid()){
            browser.redirect('/product/'+make+'/'+model+'/'+operatingSystem);
        }
    },
    render: function(){
        var component = this;
        return (<div className="search-form inner-container">
                    <div className="search-form-inner">
                        <div className="title">Specify Your PC and OS Version</div>
                        <form>
                            <DropDown label="Make" items={this.state.makes} changed={this.selectMake} valid={this.state.makeIsValid} />
                            <DropDown label="Model" items={this.state.models} changed={this.selectModel} valid={this.state.modelIsValid} emptyMessage="Please Select a Make" />
                            <DropDown label="OS" items={this.state.operatingSystems} changed={this.selectOperatingSystem} valid={this.state.operatingSystemIsValid} />
                            <div className="search-element">
                                <button className="btn btn-default submit-button" onClick={this.submit}>
                                    Find Your Drivers
                                </button>
                            </div>
                        </form>
                    </div>
                </div>);
    }
});
