

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
    this.dispatch('HIGHLIGHT');
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
  },


  search: {

    /**
     * Show search results.
     */
    activate: function() {
      this.dispatch('SEARCH_ACTIVATE');
    },

    /**
     * Hide search results.
     */
    deactivate: function() {
      this.dispatch('SEARCH_DEACTIVATE');
    },

    /**
     * Search nodes.
     *
     * @param {String} q
     */
    query: function(q) {
      this.dispatch('SEARCH_QUERY', q);
    }

  }


};
