

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
    this.results = null;
    this.emit('change');

    request
    .get('/rank')
    .query(this.query)
    .end(function(err, res) {

      // Show the new rows.
      self.results = res.body.texts;
      self.emit('change');

    });

  },


});
