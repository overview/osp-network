

var _ = require('lodash');
var React = require('react/addons');
var Fluxxor = require('fluxxor');
var SearchRow = require('./search-row');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('NodeStore')
  ],


  /**
   * Get the search results.
   */
  getStateFromFlux: function() {

    var nodeStore = this.getFlux().store('NodeStore');

    return {
      results: nodeStore.results
    };

  },


  /**
   * Render search results.
   */
  render: function() {

    // Loading spinner.
    if (_.isNull(this.state.results)) {
      return <h3>spinner</h3>;
    }

    var total = Number(this.state.results.total);

    // No results.
    if (total === 0) {
      return <h3>No results</h3>;
    }

    else {

      // Build up the list of result rows.
      var rows = _.map(this.state.results.hits, function(h) {
        return <SearchRow hit={h} key={h._id} />;
      });

      return (
        <div id="search-list">
          {rows}
        </div>
      );

    }

  }


});
