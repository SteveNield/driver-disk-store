var React = require('react');

module.exports = React.createClass({
    render: function(){
        var component = this;
        return (<div className="dropdown search-element">
                    <select id={this.props.label} ref={this.props.label} onChange={this.props.changed}>
                        <option value="0">{this.props.label}</option>
                    {
                          this.props.items.length === 0 ? 
                            <option className="empty-message">{this.props.emptyMessage}</option> : 
                            this.props.items.map(function(item,index){
                                return (<option key={index} value={item.id}>{item.name}</option>);
                            })
                    }    
                    </select>
                </div>);
    }
});