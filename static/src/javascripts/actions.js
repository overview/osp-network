

module.exports = {


  /**
   * When a query is entered.
   *
   * @param {String} q - The query string.
   */
  query: function(q) {
    this.dispatch('QUERY', q);
  }


};
