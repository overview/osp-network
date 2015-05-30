

module.exports = {


  /**
   * When a metadata query is executed.
   *
   * @param {String} query
   */
  query: function(query) {
    this.dispatch('QUERY_SEARCH', query);
  }


};
