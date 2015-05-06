

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
    this._initFields();
    this._initHighlight();
    this._initStores();
  },


  /**
   * Initialize OpenLayers.
   */
  _initLeaflet: function() {

    // Zoom buttons.
    var zoom = L.control.zoom({
      position: 'topright'
    });

    // Zoomify layer.
    var layer = L.tileLayer.zoomify('/static/tiles/', {
      detectRetina: true,
      width:  220000,
      height: 220000
    });

    // Cursor position.
    var position = L.control.mousePosition();

    this.map = L.map('image', {
      zoomControl: false,
      crs: L.CRS.Simple
    });

    this.map.setView([0,0], 0);
    this.map.addControl(zoom);
    this.map.addControl(position);
    this.map.addLayer(layer);

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
   * Initialize the highlight marker.
   */
  _initHighlight: function() {

    this.hlMarker = L.circleMarker([0,0], {
      weight: 3,
      color: '#ffc600',
      opacity: 1,
      fill: false
    });

  },


  /**
   * Listen for store changes.
   */
  _initStores: function() {

    this.selectionStore = this.getFlux().store('selection');
    this.focusStore = this.getFlux().store('focus');

    this.selectionStore.on(
      'highlight',
      _.bind(this.highlight, this)
    );

    this.selectionStore.on(
      'unhighlight',
      _.bind(this.unhighlight, this)
    );

    this.selectionStore.on(
      'select',
      _.bind(this.select, this)
    );

    this.focusStore.on(
      'change',
      _.bind(this.focus, this)
    );

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
   * Render a highlight marker.
   */
  highlight: function() {

    // Get the node point.
    var node = this.selectionStore.highlighted;
    var point = this._getNodePoint(node);

    // Render the marker.
    this.hlMarker.setLatLng(point);
    this.map.addLayer(this.hlMarker);

  },


  /**
   * Clear the highlight marker.
   */
  unhighlight: function() {
    this.map.removeLayer(this.hlMarker);
  },


  /**
   * Focus on the selected record.
   */
  select: function() {

    // Get the node point.
    var node = this.selectionStore.highlighted;
    var point = this._getNodePoint(node);

    // Focus the map.
    this.map.setView(point, 8);

  },


  /**
   * Apply a new focus position.
   */
  focus: function() {
    var f = this.focusStore.getState().focus;
    this.map.setView([f.y, f.x], f.z);
  },


  /**
   * Get a lat/lon from a node.
   *
   * @param {Object} node
   */
  _getNodePoint: function(node) {
    return this.map.unproject(
      node.getCoordinate(),
      this.map.getMaxZoom()
    );
  }


});
