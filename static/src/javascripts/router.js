

var Backbone = require('backbone');


module.exports = Backbone.Router.extend({


  routes: {
    ':x/:y/:z': 'xyz',
    ':cn': 'cn'
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
  },


  /**
   * Focus on a text.
   *
   * @param {String} cn
   */
  cn: function(cn) {
    this.flux.actions.route.cn(cn);
  }


});
