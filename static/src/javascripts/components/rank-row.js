

var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  mixins: [Fluxxor.FluxMixin(React)],


  /**
   * Render a rank result row.
   */
  render: function() {
    return (
      <tr>
        <td className="rank">1</td>
        <td className="count">10</td>
        <td className="text">text</td>
      </tr>
    );
  }


});
