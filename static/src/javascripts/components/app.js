

var React = require('react');
var Fluxxor = require('fluxxor');

var RankList = require('./rank-list');


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
            <h5>filters</h5>
          </div>

          <div className="col-md-7">
            <RankList />
          </div>

        </div>
      </div>
    );
  }


});
