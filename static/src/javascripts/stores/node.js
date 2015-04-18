

var $ = require('jquery');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    QUERY: 'onQuery'
  },


  /**
   * Run a search query.
   *
   * @param {String} q - The query string.
   */
  onQuery: function(q) {
    console.log(q);
  }


});
