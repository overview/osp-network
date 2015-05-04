

var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render the image container.
   */
  render: function() {
    return <div id="image"></div>;
  },


  /**
   * Spin up the image viewer.
   */
  componentDidMount: function() {
    this._initOpenLayers();
  },


  /**
   * Initialize OpenLayers.
   */
  _initOpenLayers: function() {
    // TODO
  }


});
