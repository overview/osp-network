

module.exports = {


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


};
