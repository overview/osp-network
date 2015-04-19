

var React = require('react/addons');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    React.addons.LinkedStateMixin
  ],


  /**
   * By default, empty query.
   */
  getInitialState: function() {
    return { query: null };
  },


  /**
   * On startup, execute the empty query.
   */
  componentDidMount: function() {
    this.getFlux().actions.query();
  },


  /**
   * Render search container.
   */
  render: function() {
    return (
      <div id="search-box">

        <div className="form-group">

          <input
            className="form-control"
            type="text"
            placeholder="Search texts..."
            valueLink={this.linkState('query')}
            onKeyUp={this.onKeyUp}
          />

        </div>

      </div>
    );

  },


  /**
   * When the query is changed.
   */
  onKeyUp: function() {
    this.getFlux().actions.query(this.state.query);
  }


});
