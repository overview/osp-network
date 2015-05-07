

var Backbone = require('backbone');
require('backbone-nested');

var Selection = require('./selection');


module.exports = Backbone.NestedModel.extend({


  /**
   * Produce a selection instance.
   *
   * @returns {Array}
   */
  toSelection: function() {

    return new Selection({
      cn:     this.get('node.label'),
      author: this.get('node.author'),
      title:  this.get('node.title'),
      x:      this.get('node.x'),
      y:      this.get('node.y')
    });

  }

});
