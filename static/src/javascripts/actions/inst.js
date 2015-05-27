

module.exports = {


  /**
   * When an institution is selected.
   *
   * @param {Number} iid
   */
  query: function(iid) {
    this.dispatch('QUERY_INST', iid);
  }


};
