

var Selection = require('./selection');
var Focus = require('./focus');
var Neighbors = require('./neighbors');
var Search = require('./search');


module.exports = {
  selection: new Selection(),
  focus: new Focus(),
  neighbors: new Neighbors(),
  search: new Search()
};
