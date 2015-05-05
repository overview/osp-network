

var _ = require('lodash');
var Backbone = require('backbone');
var React = require('react');
var Fluxxor = require('fluxxor');
var ol = require('openlayers');
var router = require('../router');


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
    this._initEvents();
    this._initStores();
  },


  /**
   * Initialize OpenLayers.
   */
  _initOpenLayers: function() {

    var d = 220000; // TODO: Env-ify.

    var proj = new ol.proj.Projection({
      units: 'pixels',
      extent: [0, 0, d, d]
    });

    this.view = new ol.View({
      projection: proj,
      center: [d/2, -d/2],
      zoom: 0
    })

    var source = new ol.source.Zoomify({
      url: '/static/tiles/',
      size: [d, d],
      tilePixelRatio: 2
    });

    var layer = new ol.layer.Tile({
      source: source
    });

    this.map = new ol.Map({
      target: this.getDOMNode(),
      view: this.view,
      layers: [layer]
    });

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

    var c = this.view.getCenter();
    var z = this.view.getZoom();

    var x = c[0].toFixed(4);
    var y = c[1].toFixed(4);

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
    this.view.setCenter([focus.x, focus.y]);
    this.view.setZoom(focus.z);
  }


});
