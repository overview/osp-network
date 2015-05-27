

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

      valueField: 'id',
      searchField: ['name', 'city'],
      labelField: 'name',
      preload: true,

      // Query for institutions.
      load: function(q, cb) {

        var self = this;

        request
        .get('/institutions')
        .query({q:q})
        .end(function(err, res) {

          // Clear old results.
          self.clearOptions();
          self.refreshOptions();

          // Render new results.
          cb(res.body.institutions);
          self.setCaret(0);

        });

      },

      // Sort by count.
      score: function() {
        return function(item) {
          return Number(item.count);
        };
      },

      // Format the results.
      render: {
        option: function(item) {
          return React.renderToString(
            <div className="institution">

              <div className="name">
                <i className="fa fa-university"></i>{' '}
                {item.name}
              </div>

              <span className="location">
                {item.city}, {item.state}
              </span>

              {' '}&bull;{' '}

              <span className="count">
                {Number(item.count).toLocaleString()}
              </span>

              {' '}

              syllabi

            </div>
          );
        }
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
      var iid = self.el.selectize.getValue();
      self.getFlux().actions.inst.query(iid);
    });

  }


});
