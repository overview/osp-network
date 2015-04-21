

var _ = require('lodash');
var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');
_.mixin(require('lodash-deep'));


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Get the text icon.
   */
  getInitialState: function() {
    return { highlighted: false };
  },


  /**
   * Render a search result row.
   */
  render: function() {

    var iconCx = classNames({
      'fa': true,
      'fa-fw': true,
      'fa-bookmark-o': !this.state.highlighted,
      'fa-thumb-tack': this.state.highlighted,
    });

    return (
      <tr
        className="text-row"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}>

        <td className="count">{this.props.row.weight}</td>
        <td className="text">

          <p>
            <i className={iconCx}></i>
            <span className="title">{this.props.row.node.title}</span>
          </p>

          <p className="author">{this.props.row.node.author}</p>
          <p className="publisher">{this.props.row.node.publisher}</p>

        </td>
      </tr>
    );

  },


  /**
   * When the row is highlighted.
   */
  onMouseEnter: function() {
    this.setState({ highlighted: true });
    this.getFlux().actions.highlight(this.model());
  },


  /**
   * When the row is unhighlighted.
   */
  onMouseLeave: function() {
    this.setState({ highlighted: false });
    this.getFlux().actions.unhighlight();
  },


  /**
   * When the row is selected.
   */
  onClick: function() {
    this.getFlux().actions.select(this.model());
  },


  /**
   * Wrap the row as a model.
   * TODO: Schema-ify this.
   */
  model: function() {
    return {
      cn:         this.props.row.node.label,
      author:     this.props.row.node.author,
      title:      this.props.row.node.title,
      publisher:  this.props.row.node.publisher,
      x:          this.props.row.node.x,
      y:          this.props.row.node.y
    };
  }


});
