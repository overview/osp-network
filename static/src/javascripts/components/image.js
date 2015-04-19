

var $ = require('jquery');
var _ = require('lodash');
var React = require('react');
var Fluxxor = require('fluxxor');
require('osd');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('SelectionStore')
  ],


  /**
   * Get selection state.
   */
  getStateFromFlux: function() {

    var selection = this.getFlux().store('SelectionStore');

    return {
      highlighted: selection.highlighted,
      selected: selection.selected
    };

  },


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
    this._bindEvents();
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
  _bindEvents: function() {

    var selection = this.getFlux().store('SelectionStore');

    selection.on(
      'highlight',
      _.bind(this.highlight, this)
    );

    selection.on(
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
