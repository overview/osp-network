

var React = require('react');
var Fluxxor = require('fluxxor');
var NetworkApp = require('./components/network-app');
var stores = require('./stores');
var actions = require('./actions');


var flux = new Fluxxor.Flux(stores, actions);


React.render(
  <NetworkApp flux={flux} />,
  document.getElementById('network')
);
