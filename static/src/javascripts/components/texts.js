

var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');
var SearchList = require('./search-list');
var SearchBox = require('./search-box');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render the top-level structure.
   */
  render: function() {
    return (
      <div id="texts">
        <SearchBox />
        <SearchList />
      </div>
    );
  }


});
