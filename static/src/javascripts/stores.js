

var SearchStore = require('./stores/search');
var SelectionStore = require('./stores/selection');


module.exports = {
  SearchStore: new SearchStore(),
  SelectionStore: new SelectionStore()
};
