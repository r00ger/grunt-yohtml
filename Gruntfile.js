'use strict';

module.exports = function (grunt) {

    var path = require('path');

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/**/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['test/tmp'],
            output: ['tmp1']
        },

        yoindex: {
            files: {
                src: 'test/fixtures/rule_*.html',
                dest: 'test/tmp/'
            },
            options: {
                usages: 'test/fixtures/usages/'
            }
        },
        yoreplace: {
            files: {
                src: '**/tpl_*.html',
                dest: 'tmp1/',
                cwd: 'test/fixtures/',
                expand: true
            },
            options: {
                index: 'test/tmp/index.json',
                indexData: 'test/tmp/index.jsonp'
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        },

        watch: {
            scripts: {
                files: ['test/fixtures/*.tpl.html', 'test/fixtures/*.html', 'tasks/output_doc/index.html'],
                tasks: ['index', 'replace']
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'yoindex', 'nodeunit']);

    grunt.registerTask('index', ['clean:tests', 'yoindex']);
    grunt.registerTask('replace', ['clean:output', 'yoreplace']);

    grunt.registerTask('build', ['index', 'replace']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
