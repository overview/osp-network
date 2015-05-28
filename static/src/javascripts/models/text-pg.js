

var Backbone = require('backbone');
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
  },


  /**
   * Compute the teaching score.
   *
   * @returns {String}
   */
  getScore: function() {
    var count = Number(this.get('count'));
    var score = (Math.log(count)/Math.log(config.maxCount))*10;
    return score.toFixed(1);
  }


});
