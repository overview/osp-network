

var Backbone = require('backbone');
require('osd');


var Network = module.exports = Backbone.View.extend({


  el: '#network',


  /**
   * Start the viewer.
   */
  initialize: function() {
    this._initImage();
  },


  /**
   * Initialize OSD.
   */
  _initImage: function() {

    this.osd = OpenSeadragon({

      id: 'network',
      tileSources: '/static/tiles/hlom.dzi',
      immediateRender: true,
      showNavigationControl: false,
      showNavigator: true,

      gestureSettingsMouse: {
        clickToZoom: false
      }

    });

  }


});
