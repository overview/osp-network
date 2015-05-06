

var React = require('react');
var Fluxxor = require('fluxxor');


module.exports = React.createClass({


  /**
   * Render search interface.
   */
  render: function() {
    return (
      <header id="branding">

        <h4>The Open Syllabus Project</h4>

        <p>
          <span className="count" id="s-count">1,177,109</span> syllabi.{' '}
          <span className="count" id="t-count">744,036</span> texts.{' '}
          <span className="count" id="c-count">9,858,427</span> citations.
        </p>

        <p>
          <a href="http://opensyllabusproject.org" target="_blank">
            Learn more
          </a>{', '}
          <a href="https://github.com/overview/osp-network" target="_blank">
            fork the code
          </a>{', or '}
          <a href="https://twitter.com/opensyllabus" target="_blank">
            get in touch
          </a>{'!'}
        </p>

      </header>
    );
  },


  /**
   * Run the count-ups!
   */
  componentDidMount: function() {
    // TODO
  },


});
