

var _ = require('lodash');
var classNames = require('classnames');
var SearchRow = require('./search-row');
var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('SearchStore'),
  ],


  /**
   * Get search state.
   */
  getStateFromFlux: function() {
    return {
      search: this.getFlux().store('SearchStore').getData()
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
      return <i className="fa fa-ban"></i>;
    }

    else {

      // Build up the list of result rows.
      var rows = _.map(this.state.search.results.hits, function(h) {
        return <SearchRow hit={h} key={h._id} />;
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
              <th className="count">Degree</th>
              <th>Text</th>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      );

    }

  }


});
