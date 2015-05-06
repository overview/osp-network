

var _ = require('lodash');
var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');
_.mixin(require('lodash-deep'));


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

        <td className="count">{this.props.hit._source.degree}</td>

        <td className="text">

          <span className="title"
            dangerouslySetInnerHTML={{__html: this.title()}}>
          </span>

          {', '}

          <span className="author"
            dangerouslySetInnerHTML={{__html: this.author()}}>
          </span>

        </td>

      </tr>
    );

  },


  /**
   * When the row is highlighted.
   */
  onMouseEnter: function() {
    this.setState({ highlighted: true });
    this.getFlux().actions.selection.highlight(this.props.hit);
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
    this.getFlux().actions.selection.select(this.props.hit);
  },


  /**
   * If a field is highlighted, get the highlighted value. If not, fall back
   * on the raw field value.
   *
   * @param {String} field - The field key.
   */
  _getHighlight: function(field) {

    var path = 'highlight.'+field

    var value = _.deepHas(this.props.hit, path) ?
      this.props.hit.highlight[field][0] :
      this.props.hit._source[field];

    return value || '';

  },


  /**
   * Author field.
   */
  author: function() {
    return this._getHighlight('author');
  },


  /**
   * Title field.
   */
  title: function() {
    return this._getHighlight('title');
  },


  /**
   * Publisher field.
   */
  publisher: function() {
    return this._getHighlight('publisher');
  }


});
