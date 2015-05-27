

var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render params.
   */
  render: function() {
    return (
      <button
        className="btn btn-primary"
        onClick={this.props.close}>

        <i className="fa fa-times-circle"></i>{' '}
        {this.props.label}: {this.props.value}

      </button>
    );
  }


});
