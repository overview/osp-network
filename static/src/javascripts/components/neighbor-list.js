

var _ = require('lodash');
var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('SelectionStore'),
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
   * Render neighbor results.
   */
  render: function() {

    var tableCx = classNames({
      'table': true,
      'table-condensed': true
    });

    return (
      <div id="neighbor-list">
        <table className={tableCx}>
          <tbody>

            <tr>
              <td onClick={this.onClose}>X</td>
              <td>anchor</td>
            </tr>

          </tbody>
        </table>
      </div>
    );

  },


  /**
   * When the close X is clicked.
   */
  onClose: function() {
    this.getFlux().actions.unselect();
  }


});
