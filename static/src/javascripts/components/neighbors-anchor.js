

var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render the neighbors anchor node.
   */
  render: function() {
    return (
      <h1>Anchor</h1>
    );
  }


});
