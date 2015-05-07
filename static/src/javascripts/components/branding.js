

var React = require('react');
var Fluxxor = require('fluxxor');
var countUp = require('countup');


module.exports = React.createClass({


  /**
   * Render the logo and links.
   */
  render: function() {
    return (
      <header id="branding">

        <h4>
          <i className="fa fa-fw fa-floppy-o"></i>{' '}
          The Open Syllabus Project
        </h4>

        <p>
          <span className="count" id="s-count"></span> syllabi.{' '}
          <span className="count" id="t-count"></span> texts.{' '}
          <span className="count" id="c-count"></span> citations.
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
   * Fancy counting animations! Because I can!
   */
  componentDidMount: function() {
    new countUp('s-count', 0, 1177109, 0, 3).start();
    new countUp('t-count', 0, 744036,  0, 3).start();
    new countUp('c-count', 0, 9858427, 0, 3).start();
  }


});
