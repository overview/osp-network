

var React = require('react');
var Fluxxor = require('fluxxor');
var SearchBox = require('./search-box');
var SearchList = require('./search-list');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render search interface.
   */
  render: function() {
    return (
      <div id="search">
        <SearchBox />
        <SearchList />
      </div>
    );
  }


});
