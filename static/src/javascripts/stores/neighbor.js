

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

    // Load neighbors.
    this.req = request
      .get('/neighbors')
      .query({ cn: node.cn })
      .end(function(err, res) {
        self.neighbors = res.body.neighbors;
        self.emit('change');
      });

  }


});
