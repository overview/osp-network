

var Backbone = require('backbone');
var chroma = require('chroma-js');
var config = require('../config');


module.exports = Backbone.Model.extend({


  /**
   * Format an integer field for display.
   *
   * @param {String} key
   * @returns {String}
   */
  formatInt: function(key) {
    return Number(this.get(key)).toLocaleString();
  }


});
