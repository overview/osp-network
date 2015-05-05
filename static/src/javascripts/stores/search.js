

var _ = require('lodash');
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

    this.results    = null;
    this.lastQuery  = null;
    this.active     = false;
    this.loading    = false;

    // Debounce the query callback.
    this.query = _.debounce(this.query, 300);

  },


  /**
   * Provide state to components.
   */
  getState: function() {
    return {
      results:  this.results,
      active:   this.active,
      loading:  this.loading
    };
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
    console.log(q);
  },


});
