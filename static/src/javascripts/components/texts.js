

var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');
var SearchBox = require('./search-box');
var SearchList = require('./search-list');
var Branding = require('./branding');
var Neighbors = require('./neighbors');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('selection')
  ],


  /**
   * Get search state.
   */
  getStateFromFlux: function() {
    return {
      selection: this.getFlux().store('selection').getState()
    };
  },


  /**
   * Render search interface.
   */
  render: function() {

    var searchCx = classNames({
      selected: this.state.selection.selected
    });

    return (
      <div id="texts" className={searchCx}>

        <Branding />

        <div className="card">

          <figure className="front">
            <div>
              <SearchBox />
              <SearchList />
            </div>
          </figure>

          <figure className="back">
            <Neighbors />
          </figure>

        </div>

      </div>
    );

  }


});
