

var SelectionStore = require('./selection');
var FocusStore = require('./focus');
var SearchStore = require('./search');


module.exports = {
  selection: new SelectionStore(),
  focus: new FocusStore(),
  search: new SearchStore()
};
