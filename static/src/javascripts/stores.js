

var SelectionStore = require('./stores/selection');
var SearchStore = require('./stores/search');
var NeighborStore = require('./stores/neighbor');


module.exports = {
  SelectionStore: new SelectionStore(),
  SearchStore: new SearchStore(),
  NeighborStore: new NeighborStore()
};
