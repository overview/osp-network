

module.exports = {


  /**
   * When an institution is selected.
   *
   * @param {Number} iid
   * @param {String} label
   */
  query: function(iid, label) {
    this.dispatch('QUERY_INST', {
      iid: iid,
      label: label
    });
  }


};
