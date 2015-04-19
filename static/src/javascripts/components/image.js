

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

    _.bindAll(this, 'onMove');

    // Listen for pan/zoom.
    this.osd.addHandler('zoom', _.debounce(this.onMove, 500));
    this.osd.addHandler('pan',  _.debounce(this.onMove, 500));

  },


  /**
   * When the image is moved.
   */
  onMove: function() {
    this.getFlux().actions.search.deactivate();
  }


});
