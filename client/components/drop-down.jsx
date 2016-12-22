var React = require('react');

module.exports = React.createClass({
    render: function(){
      return (<div className="dropdown search-element">
                <select onChange={this.props.onChange}>
                  <option value="0">{this.props.label}</option>
                  {
                    this.props.items.length === 0 ?
                      <option className="empty-message">{this.props.emptyMessage}</option> :
                      this.props.items.map(function(item,index){
                        return (<option key={index} value={item.id} className="item">{item.name}</option>);
                      })
                  }
                </select>
              </div>);
    }
});
