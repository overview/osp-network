

var SelectionStore = require('./selection');
var FocusStore = require('./focus');


module.exports = {
  selection: new SelectionStore(),
  focus: new FocusStore()
};
