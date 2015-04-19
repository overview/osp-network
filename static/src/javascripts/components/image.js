

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
   * Get the selection state.
   */
  getStateFromFlux: function() {

    var selectionStore = this.getFlux().store('SelectionStore');

    return {
      highlighted: selectionStore.highlighted
    };

  },


  /**
   * Render image container.
   */
  render: function() {
    this.renderHighlight();
    return <div id="image"></div>;
  },


  /**
   * Render highlight markers.
   */
  renderHighlight: function() {

    // If highlight, show marker.
    if (this.state.highlighted) {
      // TODO: Break this out into a proper model.
      var x = Math.round(this.state.highlighted._source.location.lon);
      var y = Math.round(this.state.highlighted._source.location.lat);
      this.setMarker(x, y);
    }

    // Otherwise, clear marker.
    else if (this.isMounted()) {
      this.osd.clearOverlays();
    }

  },


  /**
   * Initialize OSD.
   */
  componentDidMount: function() {

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
   * When the image is clicked.
   */
  onRelease: function() {
    this.getFlux().actions.search.deactivate();
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

  }


});
