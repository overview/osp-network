

module.exports = {


  /**
   * When a state is selected.
   */
  query: function(state) {
    this.dispatch('QUERY_STATE', state);
  }


};
