

var NodeStore = require('./stores/node');
var SearchStore = require('./stores/search');


module.exports = {
  NodeStore: new NodeStore(),
  SearchStore: new SearchStore()
};
