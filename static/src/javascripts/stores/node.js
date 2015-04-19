

var $ = require('jquery');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    QUERY: 'onQuery'
  },


  /**
   * No results on startup.
   */
  initialize: function() {
    this.results = false;
  },


  /**
   * Run a search query.
   *
   * @param {String} q - The query string.
   */
  onQuery: function(q) {

    var self = this;

    // Show spinner.
    this.results = false;
    this.emit('change');

    // Load results.
    $.ajax({
      url: '/search',
      dataType: 'json',
      data: {q:q},
      success: function(res) {
        self.results = res.hits;
        self.emit('change');
      }
    });

  }


});
