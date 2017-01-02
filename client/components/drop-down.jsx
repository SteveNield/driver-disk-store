var React = require('react'),
    uri = require('./../../lib/uri');

module.exports = React.createClass({
    render: function(){
      return (<div className="dropdown search-element">
                <select onChange={this.props.onChange}>
                  <option value="0">{this.props.label}</option>
                  {
                    this.props.items.length === 0 ?
                      <option className="empty-message">{this.props.emptyMessage}</option> :
                      this.props.items.map(function(item,index){
                        return (<option key={index} value={uri.encodeArgument(item)} className="item">{item}</option>);
                      })
                  }
                </select>
              </div>);
    }
});
