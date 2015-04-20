

var classSet = require('classset');
var React = require('react/addons');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('SearchStore'),
    React.addons.LinkedStateMixin
  ],


  /**
   * Get initial query.
   */
  getInitialState: function() {
    return { query: null };
  },


  /**
   * Get active state.
   */
  getStateFromFlux: function() {

    var search = this.getFlux().store('SearchStore');

    return {
      active: search.active,
      loading: search.loading
    };

  },


  /**
   * On startup, empty query.
   */
  componentDidMount: function() {
    this.getFlux().actions.search.query();
  },


  /**
   * Render search container.
   */
  render: function() {

    var boxCx = classSet({
      'active': this.state.active
    });

    var iconCx = classSet({
      'fa': true,
      'fa-fw': true,
      'fa-search': !this.state.loading,
      'fa-cog': this.state.loading,
      'fa-spin': this.state.loading
    });

    return (
      <div id="search-box" className={boxCx}>

        <div className="input-group">

          <span className="input-group-addon">
            <i className={iconCx}></i>
          </span>

          <input
            className="form-control"
            type="text"
            placeholder="Search texts..."
            valueLink={this.linkState('query')}
            onKeyUp={this.onKeyUp}
            onFocus={this.onFocus}
          />

        </div>

      </div>
    );

  },


  /**
   * When the query is changed.
   */
  onKeyUp: function() {
    this.getFlux().actions.search.query(this.state.query);
  },


  /**
   * When the input is focused.
   */
  onFocus: function() {
    this.getFlux().actions.search.activate();
  }


});
