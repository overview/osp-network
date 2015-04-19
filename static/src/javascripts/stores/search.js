

var _ = require('lodash');
var $ = require('jquery');
var request = require('superagent');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    SEARCH_ACTIVATE: 'activate',
    SEARCH_DEACTIVATE: 'deactivate',
    SEARCH_QUERY: 'query'
  },


  /**
   * Initialize results, debounce queries.
   */
  initialize: function() {

    this.results = null;
    this.lastQuery = null;
    this.active = false;
    this.loading = false;

    // Debounce the query callback.
    this.query = _.debounce(this.query, 300);

  },


  /**
   * Activate searching.
   */
  activate: function() {
    this.active = true;
    this.emit('change');
  },


  /**
   * Deactivate searching.
   */
  deactivate: function() {
    this.active = false;
    this.emit('change');
  },


  /**
   * Run a search query.
   *
   * @param {String} q - The query string.
   */
  query: function(q) {

    var self = this;

    // Catch duplicates.
    if (_.isString(q)) q = q.trim();
    if (this.lastQuery === q) return;

    // Cancel an in-flight request.
    if (this.req) {
      this.req.abort();
    }

    // Show spinner.
    this.loading = true;
    this.emit('change');

    // Load results.
    this.req = request
      .get('/search')
      .query({q:q})
      .end(function(err, res) {
        self.loading = false;
        self.results = res.body.hits;
        self.emit('change');
      });

    this.lastQuery = q;

  }


});
