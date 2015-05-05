

var React = require('react');
var Fluxxor = require('fluxxor');
var ol = require('openlayers');


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

    var d = 10000; // TODO: Env-ify.

    var proj = new ol.proj.Projection({
      code: 'ZOOMIFY',
      units: 'pixels',
      extent: [0, 0, d, d]
    });

    var view = new ol.View({
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
      view: view,
      layers: [layer]
    });

  }


});
