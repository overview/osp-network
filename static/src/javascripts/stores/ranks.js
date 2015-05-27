

var request = require('superagent');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    QUERY_STATE: 'queryState'
  },


  /**
   * Initialize results.
   */
  initialize: function() {

    this.results  = null;
    this.loading  = null;
    this.query    = {};

    this.rank();

  },


  /**
   * Provide state to components.
   */
  getState: function() {
    return {
      results:  this.results,
      loading:  this.loading,
      query:    this.query
    };
  },


  /**
   * Set the state query.
   *
   * @param {String} state
   */
  queryState: function(state) {
    this.query.state = state;
    this.rank();
  },


  /**
   * Pull rankings.
   */
  rank: function() {

    var self = this;

    // Show spinner.
    this.loading = true;
    this.emit('change');

    request
    .get('/rank')
    .query(this.query)
    .end(function(err, res) {
      self.results = res.body.texts;
      self.emit('change');
    });

  },


});
