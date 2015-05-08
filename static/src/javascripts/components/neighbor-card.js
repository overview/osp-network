

var React = require('react');
var Fluxxor = require('fluxxor');


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
   * Render the neighbor header card.
   */
  render: function() {

    // When no selection, render nothing.
    if (!this.state.selection.selected) return null;

    return (
      <header id="neighbor-card">

        <i className="fa fa-times-circle back"
          onClick={this.onClose}></i>

        <p>
          <i className="fa fa-fw fa-thumb-tack"></i>{' '}
          <span className="assigned-with">
            Texts most frequently assigned with
          </span>
        </p>

        <p className="text">


          <span className="title">
            {this.state.selection.selected.get('title')}
          </span>{', by '}

          <span className="author">
            {this.state.selection.selected.get('author')}
          </span>

        </p>

      </header>
    );

  },


  /**
   * When the close X is clicked.
   */
  onClose: function() {
    this.getFlux().actions.selection.unselect();
  }


});
