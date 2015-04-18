

var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render the top-level structure.
   */
  render: function() {
    return <h1>Network</h1>;
  }


});
