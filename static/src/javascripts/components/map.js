

var _ = require('lodash');
var React = require('react');
var Fluxxor = require('fluxxor');
var L = require('leaflet');
var markerTpl = require('./marker.jade');
require('leaflet.markercluster');


// Set Leaflet image path.
L.Icon.Default.imagePath = '/static/dist/images/leaflet'


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('institutions')
  ],


  /**
   * Get institutions.
   */
  getStateFromFlux: function() {
    return {
      institutions: this.getFlux().store('institutions').getState()
    };
  },


  /**
   * Render the container.
   */
  render: function() {

    // Show markers when data is hydrated.
    if (this.state.institutions.institutions) {
      this.renderMarkers();
    }

    return <div id="map"></div>;

  },


  /**
   * Start the map.
   */
  componentDidMount: function() {
    this._initLeaflet();
    this._initMarkers();
    this._initPub();
    this._initSub();
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


  /**
   * Initialize the marker cluster group.
   */
  _initMarkers: function() {
    this.markers = new L.MarkerClusterGroup();
    this.map.addLayer(this.markers);
  },


  /**
   * Publish institution selections.
   */
  _initPub: function() {

    var self = this;

    // When a popup is clicked.
    this.map.on('popupopen', function(e) {
      var opts = e.popup._source.options;
      self.getFlux().actions.institution.query(opts.iid, opts.name);
    });

  },


  /**
   * Manifest store changes.
   */
  _initSub: function() {

    var self = this;

    this.ranks = this.getFlux().store('ranks');

    // Close the bubble on unselect.
    this.ranks.on('change', function() {
      if (!self.ranks.query.institution) {
        self.map.closePopup();
      }
    });

  },


  /**
   * Render the marker clusters.
   */
  renderMarkers: function() {

    var self = this;

    _.each(this.state.institutions.institutions, function(i) {

      if (!i.lat) return;

      // Create the marker.
      var marker = new L.Marker([i.lat, i.lon], {
        iid: i.id,
        name: i.name
      });

      // Create the popup.
      var popup = markerTpl({
        url: i.url,
        name: i.name
      });

      // Show the marker.
      self.markers.addLayer(marker);
      marker.bindPopup(popup);

    });

  },


});
