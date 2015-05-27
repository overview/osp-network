

var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render params.
   */
  render: function() {
    return (
      <h1>params</h1>
    );
  }


});
