

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
        close={this.onClickKeywords}
      />
    }

    var state = null;

    if (this.state.ranks.query.state) {
      state = <Param
        label="State"
        value={this.state.ranks.labels.state}
        close={this.onClickState}
      />
    }

    var inst = null;

    if (this.state.ranks.query.inst) {
      inst = <Param
        label="Institution"
        value={this.state.ranks.labels.inst}
        close={this.onClickInst}
      />
    }

    if (!keywords && !state && !inst) {
      return null;
    }

    else return (
      <div id="param-list">
        {keywords}
        {state}
        {inst}
      </div>
    );

  },


  /**
   * Remove the keywords filter.
   */
  onClickKeywords: function() {
    this.getFlux().actions.keywords.query(null);
  },


  /**
   * Remove the state filter.
   */
  onClickState: function() {
    this.getFlux().actions.state.query(null);
  },


  /**
   * Remove the institution filter.
   */
  onClickInst: function() {
    this.getFlux().actions.inst.query(null);
  },


});
