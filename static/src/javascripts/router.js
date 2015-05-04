

var Router = require('director').Router;


module.exports = new Router({


  /**
   * Focus on a location.
   *
   * @param {String} x
   * @param {String} y
   * @param {String} z
   */
  '/:x/:y/:z': function(x, y, z) {
    console.log(x, y, z);
  }


});
