

var $ = require('jquery');
var Fluxxor = require('fluxxor');


module.exports = Fluxxor.createStore({


  actions: {
    QUERY: 'onQuery'
  },


  /**
   * Run a search query.
   *
   * @param {String} q - The query string.
   */
  onQuery: function(q) {

    var self = this;

    $.ajax({
      url: '/search',
      dataType: 'json',
      data: {q:q},
      success: function(res) {
        self.results = res.hits;
        self.emit('change');
      }
    });

  }


});
