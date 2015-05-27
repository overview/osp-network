

var $ = require('jquery');
var request = require('superagent');
var React = require('react');
var Fluxxor = require('fluxxor');
require('selectize');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render the institutions dropdown.
   */
  render: function() {
    return (
      <select
        id="filter-inst"
        placeholder="Filter by institution"
        className="filter">
      </select>
    );
  },


  /**
   * Wrap the select, listen for selections.
   */
  componentDidMount: function() {
    this._initSelectize();
    this._initEvents();
  },


  /**
   * Initialize Selectize.
   */
  _initSelectize: function() {

    this.el = React.findDOMNode(this);

    $(this.el).selectize({

      load: function(q, callback) {

        request
        .get('/institutions')
        .query({q:q})
        .end(function(err, res) {
          console.log(res);
        });

      }

    });

  },


  /**
   * Listen for selections.
   */
  _initEvents: function() {

    var self = this;

    // CHANGE
    $(this.el).on('change', function() {

      // Get the institution id.
      var iid = self.el.selectize.getValue();

      // Don't publish empty queries.
      if (iid) {
        self.getFlux().actions.inst.query(iid);
      }

    });

  }


});
