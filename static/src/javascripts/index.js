

var React = require('react');
var Fluxxor = require('fluxxor');
var App = require('./components/app');


// TODO
var stores = {}, actions = {};
var flux = new Fluxxor.Flux(stores, actions);


React.render(
  <App flux={flux} />,
  document.getElementById('network')
);
