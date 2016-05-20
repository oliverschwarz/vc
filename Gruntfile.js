module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'src/css/style.css' : 'src/scss/style.scss'
        }
      }
    },
    watch: {
      html: {
        files: ['src/index.html'],
        tasks: ['htmlhint']
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    },
    htmlhint: {
      build: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'doctype-first': true,
          'spec-char-escape': true,
          'id-unique': true,
          'head-script-disabled': true,
          'style-disabled': true
        },
        src: ['src/index.html']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default',['watch']);
}
