

var React = require('react');
var Fluxxor = require('fluxxor');
var Image = require('./image');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render the top-level structure.
   */
  render: function() {
    return <Image />;
  }


});
