

var _ = require('lodash');
var Backbone = require('backbone');
var React = require('react');
var Fluxxor = require('fluxxor');
var L = require('leaflet');
var fields = require('../data/fields');
var router = require('../router');

require('leaflet.Zoomify');
require('leaflet.MousePosition');


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
    this._initLeaflet();
    this._initEvents();
    this._initStores();
    this._initFields();
  },


  /**
   * Initialize OpenLayers.
   */
  _initLeaflet: function() {

    // Tile layer.
    var layer = L.tileLayer.zoomify('/static/tiles/', {
      detectRetina: true,
      width:  220000,
      height: 220000
    });

    // Cursor X/Y position.
    var position = L.control.mousePosition();

    this.map = L.map('image').setView([0,0], 0);
    this.map.addLayer(layer);
    this.map.addControl(position);

  },


  /**
   * Publish move and click events.
   */
  _initEvents: function() {

    // When the map is moved.
    this.map.on('moveend', _.bind(this.onMove, this));

    // When the map is clicked.
    this.map.on('click', _.bind(this.onClick, this));

  },


  /**
   * Render the field boxes.
   */
  _initFields: function() {

    var self = this;

    _.each(fields, function(f) {

      var pts = [
        [f.ymin, f.xmin],
        [f.ymax, f.xmin],
        [f.ymax, f.xmax],
        [f.ymin, f.xmax],
        [f.ymin, f.xmin]
      ];

      var opts = {
        color: '#ffc600',
        weight: 0.8,
        opacity: 1
      };

      // Add the outline.
      L.polyline(pts, opts).addTo(self.map);

      var icon = L.divIcon({
        html: f.label,
        iconSize: null
      });

      // Add the label.
      L.marker([f.ymin, f.xmin], { icon: icon }).addTo(self.map);

    });

  },


  /**
   * Listen for store changes.
   */
  _initStores: function() {
    this.focusStore = this.getFlux().store('focus');
    this.focusStore.on('change', _.bind(this.focus, this));
  },


  /**
   * When the map is moved.
   *
   * @param {Object} e - The moveend event.
   */
  onMove: function(e) {

    var c = this.map.getCenter();
    var z = this.map.getZoom();

    var x = c.lng.toFixed(4);
    var y = c.lat.toFixed(4);

    Backbone.history.navigate([x, y, z].join('/'), {
      replace: true
    });

  },


  /**
   * When the map is clicked.
   *
   * @param {Object} e - The click event.
   */
  onClick: function(e) {
    this.getFlux().actions.image.click();
  },


  /**
   * Apply a new focus position.
   */
  focus: function() {
    var focus = this.focusStore.getState().focus;
    this.map.setView([focus.y, focus.x], focus.z);
  }


});
