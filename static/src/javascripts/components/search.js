

var React = require('react');
var Fluxxor = require('fluxxor');
var SearchBox = require('./search-box');
var SearchList = require('./search-list');
var Branding = require('./branding');
var Neighbors = require('./neighbors');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render search interface.
   */
  render: function() {
    return (
      <div id="search">

        <Branding />

        <div id="card">

          <figure className="front">
            <SearchBox />
            <SearchList />
          </figure>

          <figure className="back">
            <Neighbors />
          </figure>

        </div>

      </div>
    );
  }


});
