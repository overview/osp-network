

var _ = require('lodash');
var $ = require('jquery');
var React = require('react');
var Fluxxor = require('fluxxor');
require('selectize');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('NodeStore'),
  ],


  /**
   * Get the current hits.
   */
  getStateFromFlux: function() {

    var node = this.getFlux().store('NodeStore')

    return {
      results: node.results
    };

  },


  /**
   * Render search container.
   */
  render: function() {

    this.renderResults();

    return (
      <div id="search">
        <select placeholder="Search texts"></select>
      </div>
    );

  },


  /**
   * Render search results.
   */
  renderResults: function() {

    // Break if no results.
    if (!this.state.results) return;

    // Gather up the hits.
    var results = _.map(this.state.results.hits, function(h) {
      return _.merge(h._source, { cn: h._id });
    });

    // Apply the new hits.
    this.selectize.clearOptions();
    this.selectize.load(function(cb) {
      cb(results);
    });

  },


  /**
   * Initialize Selectize.
   */
  componentDidMount: function() {

    // Get the <select>.
    this.select = $(this.getDOMNode()).find('select');

    // Start Selectize.
    this.select.selectize({

      loadThrottle: 100,
      allowEmptyOption: true,
      valueField: 'cn',
      labelField: 'title',

      render: {
        option: _.bind(this.option, this)
      },

      load: _.bind(this.query, this)

    });

    // Alias the instance.
    this.selectize = this.select[0].selectize;

  },


  /**
   * Run the current query.
   *
   * @param {String} q
   */
  query: function(q, cb) {
    this.getFlux().actions.query(q);
  },


  /**
   * Render an option row.
   *
   * @param {Object} item
   */
  option: function(item) {
    return React.renderToString(
      <div className="option">
        <h5>{item.title}</h5>
      </div>
    );
  }


});
