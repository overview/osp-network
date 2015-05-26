

var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('ranks')
  ],


  /**
   * Get search state.
   */
  getStateFromFlux: function() {
    return {
      ranks: this.getFlux().store('ranks').getState()
    };
  },


  /**
   * Render search results.
   */
  render: function() {
    return <h1>rank list</h1>;
  }


});
