

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
  }


});
