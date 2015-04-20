

var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');
var SearchList = require('./search-list');
var SearchBox = require('./search-box');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('SelectionStore')
  ],


  /**
   * Get active state.
   */
  getStateFromFlux: function() {

    var selection = this.getFlux().store('SelectionStore');

    return {
      selected: selection.selected
    };

  },


  /**
   * Render the top-level structure.
   */
  render: function() {

    var searchCx = classNames({
      active: !this.state.selected
    });

    return (
      <div id="search" className={searchCx}>
        <SearchBox />
        <SearchList />
      </div>
    );

  }


});
