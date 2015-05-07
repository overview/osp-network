

module.exports = {


  /**
   * When the image is clicked.
   */
  click: function() {
    this.dispatch('IMAGE_CLICK');
    this.flux.actions.selection.unselect(); // TODO|dev
  }


};
