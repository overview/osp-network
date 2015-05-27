

var React = require('react');
var Fluxxor = require('fluxxor');

var Param = require('./param');


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
   * Render params.
   */
  render: function() {

    var keywords = null;

    if (this.state.ranks.query.keywords) {
      keywords = <Param
        label="Keywords"
        value={this.state.ranks.query.keywords}
      />
    }

    var state = null;

    if (this.state.ranks.query.state) {
      state = <Param
        label="State"
        value={this.state.ranks.query.state}
      />
    }

    return (
      <div id="params">
        {keywords}
        {state}
      </div>
    );

  }


});
