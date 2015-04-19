

var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    SEARCH_ACTIVATE: 'onActivate',
    SEARCH_DEACTIVATE: 'onDeactivate'
  },


  /**
   * By default, searching is disabled.
   */
  initialize: function() {
    this.active = false;
  },


  /**
   * Activate searching.
   */
  onActivate: function() {
    this.active = true;
    this.emit('change');
  },


  /**
   * Deactivate searching.
   */
  onDeactivate: function() {
    this.active = false;
    this.emit('change');
  }


});
