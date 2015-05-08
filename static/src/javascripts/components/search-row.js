

var _ = require('lodash');
var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');

var NodeES = require('../models/node-es');
var RowMixin = require('../mixins/row');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    RowMixin
  ],


  /**
   * Wrap the incoming node instance.
   */
  componentWillMount: function() {
    this.setState({
      node: new NodeES(this.props.node)
    });
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

        <td className="count">
          {this.state.node.getSource('degree')}
        </td>

        <td className="icon">
          <i className={iconCx}></i>
        </td>

        <td className="text">

          <span className="title"
            dangerouslySetInnerHTML={{
              __html: this.state.node.getHighlightOrSource('title')
            }}>
          </span>

          {', '}

          <span className="author"
            dangerouslySetInnerHTML={{
              __html: this.state.node.getHighlightOrSource('author')
            }}>
          </span>

        </td>

      </tr>
    );

  }


});
