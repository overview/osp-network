

module.exports = {


  /**
   * Publish a focus position.
   *
   * @param {Object} node
   */
  xyz: function(x, y, z) {
    this.dispatch('ROUTE_XYZ', { x:x, y:y, z:z });
  }


};
