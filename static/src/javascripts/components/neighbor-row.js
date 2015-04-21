

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
      <tr className="text-row">
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
  //onMouseEnter: function() {
    //this.setState({ highlighted: true });
    //this.getFlux().actions.highlight(this.props.hit);
  //},


  /**
   * When the row is unhighlighted.
   */
  //onMouseLeave: function() {
    //this.setState({ highlighted: false });
    //this.getFlux().actions.unhighlight();
  //},


  /**
   * When the row is selected.
   */
  //onClick: function() {

    //// TODO: Schema-ify this.
    //var text = {
      //cn:         this.props.hit._id,
      //author:     this.props.hit._source.author,
      //title:      this.props.hit._source.title,
      //publisher:  this.props.hit._source.publisher,
      //x:          this.props.hit._source.location.lon,
      //y:          this.props.hit._source.location.lat
    //};

    //// TODO: Normalize text format.
    //this.getFlux().actions.select(text);

  //},


  /**
   * If a field is highlighted, get the highlighted value. If not, fall back
   * on the raw field value.
   *
   * @param {String} field - The field key.
   */
  //_getHighlight: function(field) {

    //var path = 'highlight.'+field

    //var value = _.deepHas(this.props.hit, path) ?
      //this.props.hit.highlight[field][0] :
      //this.props.hit._source[field];

    //return value || '';

  //},


  /**
   * Author field.
   */
  //_author: function() {
    //return this._getHighlight('author');
  //},


  /**
   * Title field.
   */
  //_title: function() {
    //return this._getHighlight('title');
  //},


  /**
   * Publisher field.
   */
  //_publisher: function() {
    //return this._getHighlight('publisher');
  //}


});
