

var _ = require('lodash');
var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');

var NeighborRow = require('./neighbor-row');
var NodeGEXF = require('../models/node-gexf');


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
      return <i className="fa fa-spin fa-cog spinner"></i>;
    }

    // Build up the list of neighbor rows.
    var rows = _.map(this.state.neighbors.results, function(r) {
      var n = new NodeGEXF(r);
      return <NeighborRow node={n} key={r.node.label} />;
    });

    var tableCx = classNames({
      'table': true,
      'table-condensed': true
    });

    return (
      <div id="neighbor-list" className="text-list">
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
