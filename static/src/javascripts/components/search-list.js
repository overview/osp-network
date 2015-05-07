

var _ = require('lodash');
var classNames = require('classnames');
var React = require('react/addons');
var Fluxxor = require('fluxxor');

var SearchRow = require('./search-row');
var NodeES = require('../models/node-es');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('search')
  ],


  /**
   * Get search state.
   */
  getStateFromFlux: function() {
    return {
      search: this.getFlux().store('search').getState()
    };
  },


  /**
   * Render search results.
   */
  render: function() {

    // Show nothing on startup.
    if (_.isNull(this.state.search.results)) {
      return null;
    }

    var total = Number(this.state.search.results.total);

    // No results.
    if (total === 0) {
      return <i className="fa fa-ban spinner"></i>;
    }

    else {

      // Build up the list of result rows.
      var rows = _.map(this.state.search.results.hits, function(h) {
        var n = new NodeES(h);
        return <SearchRow node={n} key={h._id} />;
      });

      var listCx = classNames({
        'text-list': true,
        'active': this.state.search.active
      });

      var tableCx = classNames({
        'table': true,
        'table-condensed': true
      });

      return (
        <div id="search-list" className={listCx}>
          <table className={tableCx}>
            <thead>
              <th>Degree</th>
              <th></th>
              <th>Text</th>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      );

    }

  }


});
