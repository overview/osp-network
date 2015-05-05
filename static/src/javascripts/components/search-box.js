

var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render search box.
   */
  render: function() {
    return <h3>box</h3>;
  }


});
