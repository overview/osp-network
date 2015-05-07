

var _ = require('lodash');
var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');

var RowMixin = require('../mixins/row');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    RowMixin
  ],


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

        <td className="count">
          {this.props.node.get('count')}
        </td>

        <td className="icon">
          <i className={iconCx}></i>
        </td>

        <td className="text">

          <span className="title">
            {this.props.node.get('node.title')}
          </span>

          {', '}

          <span className="author">
            {this.props.node.get('node.author')}
          </span>

        </td>

      </tr>
    );

  }


});
