

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
    this.select = $(this.getDOMNode()).find('select');
    this.select.selectize()
  }


});
