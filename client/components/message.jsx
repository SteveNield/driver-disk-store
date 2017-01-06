var React = require('react');

module.exports = React.createClass({
  render: function(){
    return (<div className="detail-panel inner-container">
              <h1>{this.props.primary}</h1>
              <h2>{this.props.secondary}</h2>
            </div>)
  }
})
