

module.exports = {


  /**
   * Publish a focus position.
   *
   * @param {String} x
   * @param {String} y
   * @param {String} z
   */
  xyz: function(x, y, z) {
    this.dispatch('ROUTE_XYZ', { x:x, y:y, z:z });
  }


};
