var React = require('react');

module.exports = React.createClass({
  render: function(){
    return (<div className="articles-container">
        <div className="article">
            <img src="/interface/dvd.png" />
            <span className="text-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc nisl. Duis scelerisque efficitur malesuada. Sed posuere lobortis metus ac sodales. In lobortis nulla nisi, eu lacinia risus volutpat in. Mauris hendrerit in dui in vulputate. In ultricies mauris nisl, id congue lorem egestas blandit. Vestibulum id elit ultricies, sollicitudin felis non, dapibus justo.
            </span>
        </div>
        <div className="article">
            <img src="/interface/search.png" />
            <span className="text-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc nisl. Duis scelerisque efficitur malesuada. Sed posuere lobortis metus ac sodales. In lobortis nulla nisi, eu lacinia risus volutpat in. Mauris hendrerit in dui in vulputate. In ultricies mauris nisl, id congue lorem egestas blandit. Vestibulum id elit ultricies, sollicitudin felis non, dapibus justo.
            </span>
        </div>
        <div className="article article-last">
            <img src="/interface/testing.png" />
            <span className="text-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nunc nisl. Duis scelerisque efficitur malesuada. Sed posuere lobortis metus ac sodales. In lobortis nulla nisi, eu lacinia risus volutpat in. Mauris hendrerit in dui in vulputate. In ultricies mauris nisl, id congue lorem egestas blandit. Vestibulum id elit ultricies, sollicitudin felis non, dapibus justo.
            </span>
        </div>
    </div>);
  }
})
