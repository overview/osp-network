

var _ = require('lodash');
var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');

var NodeGEXF = require('../models/node-gexf');
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
      node: new NodeGEXF(this.props.node)
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
          {this.state.node.get('weight')}
        </td>

        <td className="icon">
          <i className={iconCx}></i>
        </td>

        <td className="text">

          <span className="title">
            {this.state.node.get('node.title')}
          </span>

          {', '}

          <span className="author">
            {this.state.node.get('node.author')}
          </span>

        </td>

      </tr>
    );

  }


});
