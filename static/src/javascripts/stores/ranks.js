

var request = require('superagent');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    QUERY_STATE: 'queryState',
    QUERY_KEYWORDS: 'queryKeywords',
    QUERY_INST: 'queryInst'
  },


  /**
   * Initialize results.
   */
  initialize: function() {
    this.query = {};
    this.results = null;
    this.rank();
  },


  /**
   * Provide state to components.
   */
  getState: function() {
    return {
      query: this.query,
      results: this.results
    };
  },


  /**
   * Set a query parameter.
   *
   * @param {String} key
   * @param {Mixed} val
   */
  setParam: function(key, val) {

    if (val) {
      this.query[key] = val;
    } else {
      delete this.query[key];
    }

    this.emit('change');
    this.rank();

  },


  /**
   * Set the state query.
   *
   * @param {String} state
   */
  queryState: function(state) {
    this.setParam('state', state);
  },


  /**
   * Set the keywords query.
   *
   * @param {String} query
   */
  queryKeywords: function(query) {
    this.setParam('keywords', query);
  },


  /**
   * Set the institution query.
   *
   * @param {Number} iid
   */
  queryInst: function(iid) {
    this.setParam('inst', iid);
  },


  /**
   * Pull rankings.
   */
  rank: function() {

    var self = this;

    // Cancel an in-flight request.
    if (this.req) this.req.abort();

    // Show spinner.
    this.results = null;
    this.emit('change');

    this.req = request
    .get('/rank')
    .query(this.query)
    .end(function(err, res) {

      // Show the new rows.
      self.results = res.body.texts;
      self.emit('change');

    });

  },


});
