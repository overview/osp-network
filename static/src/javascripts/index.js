

var React = require('react');
var Fluxxor = require('fluxxor');
var App = require('./components/app');
var Router = require('./router');

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;


var flux = module.exports = new Fluxxor.Flux(
  require('./stores'),
  require('./actions')
);


React.render(
  <App flux={flux} />,
  document.getElementById('network')
);


new Router({ flux: flux });
Backbone.history.start();
