

module.exports = {


  /**
   * Get highlighted state.
   */
  getInitialState: function() {
    return {
      highlighted: false
    };
  },


  /**
   * Only to render a highlight.
   */
  shouldComponentUpdate: function(props, state) {
    return this.state.highlighted != state.highlighted;
  },


  /**
   * When the row is highlighted.
   */
  onMouseEnter: function() {

    this.setState({ highlighted: true });

    // Publish a selection instance.
    this.getFlux().actions.selection.highlight(
      this.state.node.toSelection()
    );

  },


  /**
   * When the row is unhighlighted.
   */
  onMouseLeave: function() {
    this.setState({ highlighted: false });
    this.getFlux().actions.selection.unhighlight();
  },


  /**
   * When the row is selected.
   */
  onClick: function() {
    this.getFlux().actions.selection.select(
      this.state.node.toSelection()
    );
  }


};
