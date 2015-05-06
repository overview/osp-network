

var Backbone = require('backbone');


module.exports = Backbone.Model.extend({


  /**
   * Provide the coordinate as [x, y].
   *
   * @returns {Array}
   */
  getXY: function() {
    return [this.get('x'), this.get('y')];
  },


});
