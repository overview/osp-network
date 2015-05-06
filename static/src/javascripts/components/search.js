

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

        <header id="branding">
          <h4>The Open Syllabus Project</h4>
          <p>1M syllabi. 750k texts. 10M citations</p>
        </header>

        <SearchBox />
        <SearchList />

      </div>
    );
  }


});
