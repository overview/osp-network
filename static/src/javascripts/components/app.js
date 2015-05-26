

var React = require('react');
var Fluxxor = require('fluxxor');

var RankList = require('./rank-list');
var QueryState = require('./query-state');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render the application.
   */
  render: function() {
    return (
      <div className="container">
        <div className="row">

          <div className="col-md-5">
            <QueryState />
          </div>

          <div className="col-md-7">
            <RankList />
          </div>

        </div>
      </div>
    );
  }


});
