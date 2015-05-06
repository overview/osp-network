

var Backbone = require('backbone');
require('backbone-nested');


module.exports = Backbone.NestedModel.extend({


  /**
   * If a field is highlighted, get the highlighted value. If not, fall back
   * on the raw field value.
   *
   * @param {String} field - The field key.
   */
  getHighlight: function(field) {
    var hPath = 'highlight.'+field;
    var sPath = '_source.'+field;
    return this.get(hPath) ? this.get(hPath) : this.get(sPath);
  }


});
