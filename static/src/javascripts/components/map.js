

var React = require('react');
var Fluxxor = require('fluxxor');
var L = require('leaflet');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render the container.
   */
  render: function() {
    return <div id="map"></div>;
  },


  /**
   * Start the map.
   */
  componentDidMount: function() {
    this._initLeaflet();
  },


  /**
   * Initialize the Leaflet instance.
   */
  _initLeaflet: function() {

    var self = this;
    this.map = L.map(this.getDOMNode());

    // Create an OSM tile layer.
    var url = '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    L.tileLayer(url).addTo(this.map);

    // Focus on NYC.
    this.map.setView([40.73, -73.93], 6)

  },


});
