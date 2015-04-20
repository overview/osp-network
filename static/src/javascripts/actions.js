

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

  },


  image: {

    /**
     * When the image is clicked.
     *
     * @param {Number} x
     * @param {Number} y
     */
    click: function(x, y) {

      // Close search, if it's open.
      if (this.flux.store('SearchStore').active) {
        this.flux.actions.search.deactivate();
      }

    }

  }


};
