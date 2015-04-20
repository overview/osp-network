

var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render the neighbors list.
   */
  render: function() {
    return (
      <h1>List</h1>
    );
  }


});
