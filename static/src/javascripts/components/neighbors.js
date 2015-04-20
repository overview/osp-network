

var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('SelectionStore')
  ],


  /**
   * Get selection state.
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

    var neighborsCx = classNames({
      active: this.state.selected
    });

    return (
      <div id="neighbors" className={neighborsCx}>
        <h1>Neighbors</h1>
      </div>
    );

  }


});
