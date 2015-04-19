

var React = require('react/addons');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  /**
   * Render a search result row.
   */
  render: function() {
    return <div>{this.props.hit._source.title}</div>;
  }


});
