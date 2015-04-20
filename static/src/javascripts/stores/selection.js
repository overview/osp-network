

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
   * Provide data to components.
   */
  getData: function() {
    return {
      highlighted: this.highlighted,
      selected: this.selected
    };
  },


  /**
   * Highlight a node.
   */
  highlight: function(node) {
    this.highlighted = node;
    this.emit('change');
    this.emit('highlight');
  },


  /**
   * Unhighlight a node.
   */
  unhighlight: function() {
    this.highlighted = null;
    this.emit('change');
    this.emit('unhighlight');
  },


  /**
   * Select a node.
   */
  select: function(node) {
    this.selected = node;
    this.emit('change');
    this.emit('select');
  },


  /**
   * Unselect a node.
   */
  unselect: function() {
    this.selected = null;
    this.emit('change');
    this.emit('unselect');
  }


});
