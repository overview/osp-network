

var _ = require('lodash');
var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Get highlighted state.
   */
  getInitialState: function() {
    return {
      highlighted: false
    };
  },


  /**
   * Render a search result row.
   */
  render: function() {

    var iconCx = classNames({
      'fa':             true,
      'fa-fw':          true,
      'fa-bookmark-o':  !this.state.highlighted,
      'fa-thumb-tack':  this.state.highlighted,
    });

    return (
      <tr
        className="text-row"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}>

        <td className="count">count</td>

        <td className="icon">
          <i className={iconCx}></i>
        </td>

        <td className="text">icon</td>

      </tr>
    );

  },


  /**
   * When the row is highlighted.
   */
  onMouseEnter: function() {

    this.setState({ highlighted: true });

    // Publish a selection instance.
    this.getFlux().actions.selection.highlight(
      this.props.node.toSelection()
    );

  },


  /**
   * When the row is unhighlighted.
   */
  onMouseLeave: function() {
    this.setState({ highlighted: false });
    this.getFlux().actions.selection.unhighlight();
  },


  /**
   * When the row is selected.
   */
  onClick: function() {
    this.getFlux().actions.selection.select(
      this.props.node.toSelection()
    );
  }


});
