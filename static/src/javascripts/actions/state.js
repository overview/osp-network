

module.exports = {


  /**
   * When a state is selected.
   *
   * @param {String} state
   */
  query: function(state) {
    this.dispatch('QUERY_STATE', state);
  }


};
