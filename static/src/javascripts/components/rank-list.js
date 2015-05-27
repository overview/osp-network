

var _ = require('lodash');
var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');

var RankRow = require('./rank-row');


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

    // Loading spinner.
    if (_.isNull(this.state.ranks.results)) {

      var spinnerCx = classNames({
        'fa': true,
        'fa-spin': true,
        'fa-gear': true,
        'spinner': true
      });

      return <i className={spinnerCx}></i>;

    }

    else {

      // Tack a timestamp onto the keys, to re-render.
      var texts = _.map(this.state.ranks.results, function(r) {
        return <RankRow text={r} key={r.id} />;
      });

      var tableCx = classNames({
        'table': true,
        'table-hover': true
      });

      return (
        <div id="rank-list" className="text-list">
          <table className={tableCx}>
            <thead>
              <th>Rank</th>
              <th>Count</th>
              <th className="text">Text</th>
            </thead>
            <tbody>
              {texts}
            </tbody>
          </table>
        </div>
      );

    }

  }


});
