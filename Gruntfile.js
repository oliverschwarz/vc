'use strict';

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
        files: ['src/*.html'],
        tasks: ['htmlhint']
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass'],
        options: {
          sourcemap: 'none'
        }
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
        src: ['src/*.html']
      }
    },
    clean: ['<%= pkg.dest %>'],
    rsync: {
      options: {
        args: ['--verbose'],
        exclude: ['.git*', '*.scss', 'scss', '*.css.map'],
        recursive: true
      },
      dist: {
        options: {
          src: 'src/',
          dest: "<%= pkg.dest %>"
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          '<%= pkg.dest %>/css/style.min.css': '<%= pkg.dest %>/css/style.css'
        }
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', []);
  grunt.registerTask('deploy', ['clean', 'rsync', 'cssmin']);
}
