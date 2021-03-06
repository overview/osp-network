

var Backbone = require('backbone');


module.exports = Backbone.Router.extend({


  routes: {
    ':x/:y/:z': 'xyz'
  },


  /**
   * Set the flux instance.
   *
   * @param {Object} options
   */
  initialize: function(options) {
    this.flux = options.flux;
  },


  /**
   * Focus on a location.
   *
   * @param {String} x
   * @param {String} y
   * @param {String} z
   */
  xyz: function(x, y, z) {
    this.flux.actions.route.xyz(
      Number(x),
      Number(y),
      Number(z)
    );
  }


});
