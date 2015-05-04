

var Backbone = require('backbone');
var ol = require('openlayers');


module.exports = Backbone.View.extend({


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
    console.log(ol);
  }


});
