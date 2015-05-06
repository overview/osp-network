

module.exports = {

  options: {
    transform: [
      'reactify',
      'browserify-shim'
    ],
    watch: true,
    browserifyOptions: {
      debug: true
    }
  },

  dist: {
    src: '<%= src %>/javascripts/index.js',
    dest: '<%= dest %>/script.js'
  }

};
