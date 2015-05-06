

var Backbone = require('backbone');
require('backbone-nested');


module.exports = Backbone.NestedModel.extend({


  /**
   * Get an original source value
   *
   * @param {String} field - The field key.
   * @returns {String}
   */
  getSource: function(field) {
    return this.get('_source.'+field);
  },


  /**
   * Get a hit-highlighted value.
   *
   * @param {String} field - The field key.
   * @returns {String}
   */
  getHighlight: function(field) {
    return this.get('highlight.'+field);
  },


  /**
   * Try to get a highlighted value, and fall back to the source.
   *
   * @param {String} field - The field key.
   * @returns {String}
   */
  getHighlightOrSource: function(field) {
    return this.getHighlight(field) || this.getSource(field);
  },


  /**
   * Get the spatial coordinate as [x, y].
   *
   * @returns {Array}
   */
  getCoordinate: function() {
    var loc = this.getSource('location');
    return [loc.lon, loc.lat];
  }


});
