

var Backbone = require('backbone');
var Selection = require('./selection');
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
   * Produce a selection instance.
   *
   * @returns {Array}
   */
  toSelection: function() {

    var location = this.getSource('location');

    return new Selection({
      cn:     this.get('_id'),
      title:  this.getSource('title'),
      author: this.getSource('author'),
      x:      location.lon,
      y:      location.lat
    });

  }


});
