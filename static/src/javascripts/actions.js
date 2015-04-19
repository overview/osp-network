

module.exports = {


  node: {

    /**
     * When a query is entered.
     *
     * @param {String} q - The query string.
     */
    query: function(q) {
      this.dispatch('QUERY_NODES', q);
    }

  },


  search: {

    /**
     * Activate the browse UI.
     */
    activate: function() {
      this.dispatch('ACTIVATE_SEARCH');
    }

  }


};
