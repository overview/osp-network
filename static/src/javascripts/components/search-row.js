

var _ = require('lodash');
var React = require('react');
var Fluxxor = require('fluxxor');
_.mixin(require('lodash-deep'));


module.exports = React.createClass({


  /**
   * Render a search result row.
   */
  render: function() {
    return (
      <tr className="search-row">
        <td className="degree">10</td>
        <td className="text">

          <p>

            <i className="fa fa-bookmark-o"></i>

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
