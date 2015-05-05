

var _ = require('lodash');
var Backbone = require('backbone');
var React = require('react');
var Fluxxor = require('fluxxor');
var L = require('leaflet');
var router = require('../router');
require('zlayer');


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
  },


  /**
   * Initialize OpenLayers.
   */
  _initLeaflet: function() {

    // TODO: Env-ify.
    var d = 220000;

    var layer = L.tileLayer.zoomify('/static/tiles/', {
      detectRetina: true,
      width: d,
      height: d
    });

    this.map = L.map('image').setView([0,0], 0);
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
    console.log(e);
  },


  /**
   * Apply a new focus position.
   */
  focus: function() {
    var focus = this.focusStore.getState().focus;
    this.map.setView([focus.y, focus.x], focus.z);
  }


});
