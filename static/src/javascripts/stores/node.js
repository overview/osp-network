

var _ = require('lodash');
var $ = require('jquery');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    QUERY: 'onQuery'
  },


  /**
   * Initialize results, debounce queries.
   */
  initialize: function() {

    this.results = false;

    // Debounce the query callback.
    this.onQuery = _.debounce(this.onQuery, 200);

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
