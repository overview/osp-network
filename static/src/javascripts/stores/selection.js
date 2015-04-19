

var _ = require('lodash');
var $ = require('jquery');
var request = require('superagent');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    HIGHLIGHT: 'highlight',
    UNHIGHLIGHT: 'unhighlight',
    SELECT: 'select',
    UNSELECT: 'unselect'
  },


  /**
   * Initialize results, debounce queries.
   */
  initialize: function() {
    this.highlighed = null;
    this.selected = null;
  },


  /**
   * Highlight a node.
   */
  highlight: function(node) {
    this.highlighted = node;
    this.emit('change');
  },


  /**
   * Unhighlight a node.
   */
  unhighlight: function(node) {
    this.highlighted = null;
    this.emit('change');
  },


  /**
   * Select a node.
   */
  select: function(node) {
    this.selected = node;
    this.emit('change');
  },


  /**
   * Unselect a node.
   */
  unselect: function(node) {
    this.selected = null;
    this.emit('change');
  }


});
