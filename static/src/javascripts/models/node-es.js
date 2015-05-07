

var Backbone = require('backbone');
require('backbone-nested');

var Selection = require('./selection');


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
      author: this.getSource('author'),
      title:  this.getSource('title'),
      x:      location.lon,
      y:      location.lat
    });

  }


});
