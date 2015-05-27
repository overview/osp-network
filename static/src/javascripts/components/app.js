

var React = require('react');
var Fluxxor = require('fluxxor');

var RankList = require('./rank-list');
var QueryKeywords = require('./query-keywords');
var QueryInst = require('./query-inst');
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

          <div id="filters" className="col-md-5">
            <QueryKeywords />
            <QueryState />
            <QueryInst />
          </div>

          <div id="texts" className="col-md-7">
            <RankList />
          </div>

        </div>
      </div>
    );
  }


});
