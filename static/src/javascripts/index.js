

var React = require('react');
var Fluxxor = require('fluxxor');
var Network = require('./components/network');
var stores = require('./stores');
var actions = require('./actions');


var flux = new Fluxxor.Flux(stores, actions);


React.render(
  <Network flux={flux} />,
  document.getElementById('network')
);
