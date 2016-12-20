var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(<div className="radio">
            <label>
              <input
                type="radio"
                name="options"
                id={this.props.option.id}
                onClick={this.props.changeSelected}
                value={this.props.index}
                defaultChecked={(this.props.option.id === this.props.selected)} />
                {this.props.option.name}{(this.props.option.delivered) ? " (Delivered)" : ""}
              </label>
          </div>);
  }
})
