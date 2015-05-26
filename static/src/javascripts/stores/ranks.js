

var request = require('superagent');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  /**
   * Initialize results.
   */
  initialize: function() {
    this.results = null;
    this.loading = null;
    this.query();
  },


  /**
   * Provide state to components.
   */
  getState: function() {
    return {
      results: this.results,
      loading: this.loading
    };
  },


  /**
   * Pull rankings.
   */
  query: function() {

    var self = this;

    // Show spinner.
    this.loading = true;
    this.emit('change');

    request
    .get('/rank')
    .end(function(err, res) {
      self.results = res.body.texts;
      self.emit('change');
    });

  },


});
