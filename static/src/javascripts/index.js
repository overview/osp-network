

var React = require('react');
var Fluxxor = require('fluxxor');
var App = require('./components/app');


var flux = new Fluxxor.Flux(
  require('./stores'),
  require('./actions')
);


React.render(
  <App flux={flux} />,
  document.getElementById('network')
);
