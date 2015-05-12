

var classNames = require('classnames');
var React = require('react');
var Fluxxor = require('fluxxor');

var Branding = require('./branding');
var NeighborList = require('./neighbor-list');
var NeighborCard = require('./neighbor-card');
var SearchBox = require('./search-box');
var SearchList = require('./search-list');


module.exports = React.createClass({


  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('selection', 'search')
  ],


  /**
   * Get search state.
   */
  getStateFromFlux: function() {
    return {
      selection: this.getFlux().store('selection').getState(),
      search: this.getFlux().store('search').getState()
    };
  },


  /**
   * Render search interface.
   */
  render: function() {

    var searchCx = classNames({
      expanded: this.state.selection.selected || this.state.search.active,
      selected: this.state.selection.selected
    });

    return (
      <div id="texts" className={searchCx}>

        <Branding />

        <section className="search">
          <SearchBox />
          <SearchList />
        </section>

        <section className="neighbors">
          <NeighborCard />
          <NeighborList />
        </section>

      </div>
    );

  }


});
