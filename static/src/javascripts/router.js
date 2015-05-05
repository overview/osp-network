

var Backbone = require('backbone');


module.exports = Backbone.Router.extend({


  routes: {
    ':x/:y/:z': 'xyz'
  },


  /**
   * Focus on a location.
   *
   * @param {String} x
   * @param {String} y
   * @param {String} z
   */
  xyz: function(x, y, z) {
    console.log(x, y, z);
  }


});
