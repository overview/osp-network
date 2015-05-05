

var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    ROUTE_XYZ: 'setFocus'
  },


  /**
   * Initialize focus.
   */
  initialize: function() {
    this.focus = null;
  },


  /**
   * Provide data to components.
   */
  getState: function() {
    return { focus: this.focus };
  },


  /**
   * Set the focus.
   *
   * @param {Object} focus - The X/Y/Z focus.
   */
  setFocus: function(focus) {
    this.focus = focus;
    this.emit('change');
  }


});
