

var _ = require('lodash');
var request = require('superagent');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    SELECT: 'load'
  },


  /**
   * Initialize results.
   */
  initialize: function() {
    this.neighbors = null;
  },


  /**
   * Provide data to components.
   */
  getData: function() {
    return {
      neighbors: this.neighbors
    };
  },


  /**
   * Load neighbors.
   *
   * @param {String} node
   */
  load: function(node) {

    var self = this;

    // Show spinner.
    this.neighbors = null;
    this.emit('change');

    // Load neighbors.
    this.req = request
      .get('/neighbors')
      .query({ cn: node.cn })
      .end(function(err, res) {

        // Show the new rows.
        self.neighbors = res.body.neighbors;
        self.emit('change');

      });

  }


});
