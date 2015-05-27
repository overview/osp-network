

var React = require('react/addons');
var Fluxxor = require('fluxxor');
var classNames = require('classnames');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    React.addons.LinkedStateMixin
  ],


  /**
   * Get initial query.
   */
  getInitialState: function() {
    return {
      query: null
    };
  },


  /**
   * Render the state dropdown.
   */
  render: function() {

    var iconCx = classNames({
      'fa': true,
      'fa-fw': true,
      'fa-search': true
    });

    return (
      <div
        id="filter-keywords"
        className="input-group filter">

        <span className="input-group-addon">
          <i className={iconCx}></i>
        </span>

        <input
          className="form-control"
          type="text"
          placeholder="Filter by keywords in syllabi"
          valueLink={this.linkState('query')}
          onKeyUp={this.onKeyUp}
          onFocus={this.onFocus}
        />

      </div>
    );

  },


  /**
   * When the query is changed.
   */
  onKeyUp: function() {
    this.getFlux().actions.keywords.query(this.state.query);
  },


});
