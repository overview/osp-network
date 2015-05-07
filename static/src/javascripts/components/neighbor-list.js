

var _ = require('lodash');
var classNames = require('classnames');
var React = require('react');
var NeighborRow = require('./neighbor-row');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('neighbors')
  ],


  /**
   * Get neighbors state.
   */
  getStateFromFlux: function() {
    return {
      neighbors: this.getFlux().store('neighbors').getState()
    };
  },


  /**
   * Render neighbor results.
   */
  render: function() {

    // No results.
    if (_.isNull(this.state.neighbors.results)) {
      return <i className="fa fa-spin fa-cog"></i>;
    }

    // Build up the list of neighbor rows.
    var rows = _.map(this.state.neighbors.results, function(n) {
      return <NeighborRow row={n} key={n.node.label} />;
    });

    var tableCx = classNames({
      'table': true,
      'table-condensed': true
    });

    return (
      <div id="neighbor-list">
        <table className={tableCx}>

          <thead>
            <th>Count</th>
            <th></th>
            <th>Text</th>
          </thead>

          <tbody>{rows}</tbody>

        </table>
      </div>
    );

  }


});
