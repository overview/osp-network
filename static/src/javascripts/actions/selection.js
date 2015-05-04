

module.exports = {


  /**
   * Highlight a node.
   *
   * @param {Object} node
   */
  highlight: function(node) {
    this.dispatch('HIGHLIGHT', node);
  },


  /**
   * Unhilight the current node.
   */
  unhighlight: function(node) {
    this.dispatch('UNHIGHLIGHT');
  },


  /**
   * Select a node.
   *
   * @param {Object} node
   */
  select: function(node) {
    this.dispatch('SELECT', node);
  },


  /**
   * Unselect the current node.
   */
  unselect: function() {
    this.dispatch('UNSELECT');
  }


};
