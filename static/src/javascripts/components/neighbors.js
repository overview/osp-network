

var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');
var NeighborsAnchor = require('./neighbors-anchor');
var NeighborsList = require('./neighbors-list');


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

    var neighborsCx = classNames({
      active: this.state.selection.selected
    });

    return (
      <div id="neighbors" className={neighborsCx}>
        <NeighborsAnchor />
        <NeighborsList />
      </div>
    );

  }


});
