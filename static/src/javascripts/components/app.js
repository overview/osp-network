

var React = require('react');
var Fluxxor = require('fluxxor');
var Image = require('./image');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render the application.
   */
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Image />
        </div>
      </div>
    );
  }


});
