

var _ = require('lodash');
var $ = require('jquery');
var React = require('react');
var Fluxxor = require('fluxxor');
require('selectize');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render search container.
   */
  render: function() {
    return (
      <div id="search">
        <select placeholder="Search texts"></select>
      </div>
    );
  },


  /**
   * Initialize Selectize.
   */
  componentDidMount: function() {

    // Get the <select>.
    this.select = $(this.getDOMNode()).find('select');

    // Start Selectize.
    this.select.selectize({
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
  query: function(q) {
    this.getFlux().actions.query(q);
  }


});
