

var _ = require('lodash');
var $ = require('jquery');
var request = require('superagent');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    SEARCH_ACTIVATE: 'onActivate',
    SEARCH_DEACTIVATE: 'onDeactivate',
    SEARCH_QUERY: 'onQuery'
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
    this.onQuery = _.debounce(this.onQuery, 300);

  },


  /**
   * Run a search query.
   *
   * @param {String} q - The query string.
   */
  onQuery: function(q) {

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
