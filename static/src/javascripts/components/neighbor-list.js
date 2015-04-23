

var _ = require('lodash');
var classNames = require('classnames');
var NeighborRow = require('./neighbor-row');
var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('NeighborStore'),
  ],


  /**
   * Get neighbors state.
   */
  getStateFromFlux: function() {
    return {
      neighbor: this.getFlux().store('NeighborStore').getData()
    };
  },


  /**
   * Render neighbor results.
   */
  render: function() {

    // No results.
    if (_.isNull(this.state.neighbor.neighbors)) {
      return <i className="fa fa-spin fa-cog"></i>;
    }

    console.log(this.state.neighbor);

    // Build up the list of neighbor rows.
    var rows = _.map(this.state.neighbor.neighbors, function(n) {
      return <NeighborRow row={n} key={n.node.label} />;
    });

    var tableCx = classNames({
      'table': true,
      'table-condensed': true
    });

    return (
      <div>

        <div className="text-list alert alert-dismissible">

          <button
            className="close"
            onClick={this.onClose}>
            <i className="fa fa-times"></i>
          </button>

          <strong className="title">
            <i className="fa fa-fw fa-thumb-tack"></i>
            {this.state.neighbor.node.title}
          </strong>

        </div>

        <div id="neighbor-list" className="text-list">
          <table className={tableCx}>

            <thead>
              <th className="count">Count</th>
              <th>Text</th>
            </thead>

            <tbody>
              {rows}
            </tbody>

          </table>
        </div>

      </div>
    );

  },


  /**
   * When the close X is clicked.
   */
  onClose: function() {
    this.getFlux().actions.unselect();
  }


});
