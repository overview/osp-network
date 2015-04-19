

var _ = require('lodash');
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

    var iconCx = React.addons.classSet({
      'fa': true,
      'fa-fw': true,
      'fa-bookmark-o': !this.state.highlighted,
      'fa-thumb-tack': this.state.highlighted,
    });

    return (
      <tr
        className="search-row"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}>

        <td className="degree">10</td>

        <td className="text">

          <p>

            <i className={iconCx}></i>

            <span
              className="title"
              dangerouslySetInnerHTML={{__html: this._title()}}>
            </span>

          </p>

          <p
            className="author"
            dangerouslySetInnerHTML={{__html: this._author()}}>
          </p>

          <p
            className="publisher"
            dangerouslySetInnerHTML={{__html: this._publisher()}}>
          </p>

        </td>

      </tr>
    );

  },


  /**
   * When the row is highlighted.
   */
  onMouseEnter: function() {
    this.setState({ highlighted: true });
    this.getFlux().actions.highlight(this.props.hit);
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
    this.getFlux().actions.select(this.props.hit);
  },


  /**
   * If a field is highlighted, get the highlighted value. If not, fall back
   * on the raw field value.
   *
   * @param {String} field - The field key.
   */
  _getHighlight: function(field) {

    var path = 'highlight.'+field

    return _.deepHas(this.props.hit, path) ?
      this.props.hit.highlight[field][0] :
      this.props.hit._source[field];

  },


  /**
   * Author field.
   */
  _author: function() {
    return this._getHighlight('author');
  },


  /**
   * Title field.
   */
  _title: function() {
    return this._getHighlight('title');
  },


  /**
   * Publisher field.
   */
  _publisher: function() {
    return this._getHighlight('publisher');
  }


});
