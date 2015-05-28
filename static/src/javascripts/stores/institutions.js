

var request = require('superagent');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  /**
   * Load institutions.
   */
  initialize: function() {
    this.institutions = null;
  },


  /**
   * Provide state to components.
   */
  getState: function() {
    return {
      institutions: this.institutions
    };
  },


});
