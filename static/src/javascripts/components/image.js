

var $ = require('jquery');
var _ = require('lodash');
var React = require('react');
var Fluxxor = require('fluxxor');
require('osd');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render image container.
   */
  render: function() {
    return <div id="image"></div>;
  },


  /**
   * Start the viewer.
   */
  componentDidMount: function() {
    this._initOSD();
    this._bindStores();
  },


  /**
   * Initialize OSD.
   */
  _initOSD: function() {

    // TODO: Env-ify the source.
    this.osd = OpenSeadragon({

      id: 'image',
      tileSources: 'http://localhost:5001/hlom.dzi',
      immediateRender: true,
      showNavigationControl: false,
      showNavigator: true,

      gestureSettingsMouse: {
        clickToZoom: false
      }

    });

    // Listen for click.
    this.osd.addHandler(
      'canvas-release',
      _.bind(this.onRelease, this)
    );

  },


  /**
   * Listen for node selections.
   */
  _bindStores: function() {

    this.selection = this.getFlux().store('SelectionStore');

    this.selection.on(
      'highlight',
      _.bind(this.highlight, this)
    );

    this.selection.on(
      'unhighlight',
      _.bind(this.unhighlight, this)
    );

  },


  /**
   * Render a highlight marker.
   *
   * @param {Object} node
   */
  highlight: function(node) {

    var node = this.selection.highlighted;

    // TODO: Break this out into a proper model.
    var x = Math.round(node._source.location.lon);
    var y = Math.round(node._source.location.lat);
    this.setMarker(x, y);

  },


  /**
   * Clear the highlight marker.
   */
  unhighlight: function() {
    this.osd.clearOverlays();
  },


  /**
   * Render a highlight marker.
   *
   * @param {Number} x
   * @param {Number} y
   */
  setMarker: function(x, y) {

    this.osd.clearOverlays();

    // Get OSD viewport coordinates.
    var point = this.osd.viewport.imageToViewportCoordinates(x, y);

    // Template the marker icon.
    var marker = $('<i class="fa fa-2x fa-map-marker"></i>').get(0);

    this.osd.addOverlay({
      element: marker, location: point
    });

  },


  /**
   * When the image is clicked.
   */
  onRelease: function() {
    this.getFlux().actions.search.deactivate();
  }


});
