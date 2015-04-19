

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

          <div>

            <i className="fa fa-bookmark-o"></i>

            <span
              className="title"
              dangerouslySetInnerHTML={{__html: this._title()}}>
            </span>

          </div>

          <div
            className="author"
            dangerouslySetInnerHTML={{__html: this._author()}}>
          </div>

          <small
            className="publisher"
            dangerouslySetInnerHTML={{__html: this._publisher()}}>
          </small>

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
