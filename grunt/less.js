

module.exports = {

  options: {
    paths: [
      'node_modules',
      'bower_components'
    ],
    sourceMap: true,
    sourceMapURL: 'style.css.map',
    outputSourceFiles: true
  },

  dist: {
    src: '<%= src %>/stylesheets/index.less',
    dest: '<%= dest %>/style.css'
  }

}
