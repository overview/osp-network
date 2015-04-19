

module.exports = {


  node: {

    /**
     * Search nodes.
     *
     * @param {String} q - The query string.
     */
    query: function(q) {
      this.dispatch('NODE_QUERY', q);
    },

    /**
     * Highlight a node.
     */
    highlight: function() {
      this.dispatch('NODE_HIGHLIGHT');
    },

    /**
     * Unhighlight a node.
     */
    unhighlight: function() {
      this.dispatch('NODE_UNHIGHLIGHT');
    }

  },


  search: {

    /**
     * Activate the browse UI.
     */
    activate: function() {
      this.dispatch('SEARCH_ACTIVATE');
    },

    /**
     * Deactivate the browse UI.
     */
    deactivate: function() {
      this.dispatch('SEARCH_DEACTIVATE');
    }

  }


};
