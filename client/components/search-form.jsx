var React = require('react');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            openDropDown: ''
        };
    },
    openMake: function(){
        this.setState({openDropDown: 'make'});
    },
    openModel: function(){
        this.setState({openDropDown: 'model'});  
    },
    openWindows: function(){
        this.setState({openDropDown: 'windows'});  
    },
    render: function(){
        return (<div className="search-form inner-container">
                    <div className="search-form-inner">
                        <div className="title">Specify Your PC and OS Version</div>
                        <form>
                            <div className="dropdown search-element">
                              <button id="openMake" className="btn btn-default dropdown-toggle" type="button" onClick={this.openMake}>
                                Make
                                <span className="caret"></span>
                              </button>
                              <ul id="makeList" className="dropdown-menu" style={{ display:(this.state.openDropDown==='make'?'block':'none') }}>
                                <li><a href="#">Acer</a></li>
                                <li><a href="#">Dell</a></li>
                                <li><a href="#">Lenovo</a></li>
                              </ul>
                            </div>
                            <div className="dropdown search-element">
                              <button id="openModel" className="btn btn-default dropdown-toggle" type="button" onClick={this.openModel}>
                                Model
                                <span className="caret"></span>
                              </button>
                              <ul id="modelList" className="dropdown-menu" style={{ display:(this.state.openDropDown==='model'?'block':'none') }}>
                                <li><a href="#">Aspire 5570</a></li>
                                <li><a href="#">Aspire 5560</a></li>
                                <li><a href="#">Aspire 5550</a></li>
                              </ul>
                            </div>
                            <div className="dropdown search-element">
                              <button id="openWindows" className="btn btn-default dropdown-toggle" type="button" onClick={this.openWindows}>
                                Windows
                                <span className="caret"></span>
                              </button>
                              <ul id="windowsList" className="dropdown-menu" style={{ display:(this.state.openDropDown==='windows'?'block':'none') }}>
                                <li><a href="#">Vista</a></li>
                                <li><a href="#">7</a></li>
                                <li><a href="#">8</a></li>
                                <li><a href="#">10</a></li>
                              </ul>
                            </div>
                            <div className="search-element">
                                <button className="btn btn-default submit-button">Find Your Drivers</button>
                            </div>
                        </form>
                    </div>
                </div>);   
    }
});