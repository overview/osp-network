

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
   * Get selection state.
   */
  getStateFromFlux: function() {
    return {
      selection: this.getFlux().store('SelectionStore').getData()
    };
  },


  /**
   * Render the top-level structure.
   */
  render: function() {

    var searchCx = classNames({
      active: !this.state.selection.selected
    });

    return (
      <div id="search" className={searchCx}>
        <SearchBox />
        <SearchList />
      </div>
    );

  }


});
