/*global module:false*//*jshint unused:false*/

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['components'],

        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            bower: {
                command: 'bower install'
            },
            "test-ui": {
                command: function(webdriver, reporter) {
                    return 'export webdriver=' + (webdriver || 'phantomjs') + '&&mocha --timeout 60000 test/ui/spec/*-spec.js -R ' + (reporter || 'spec');
                }
            }
        },

        less: {
            compile: {
                options: {
                    paths: ['less/', 'components/']
                },
                files: [
                    {
                        expand: true,
                        cwd: 'less',
                        src: ['map.less'],
                        dest: 'css/',
                        ext: '.css',
                        nonull: true
                    }
                ]
            }
        },

        watch: {
            component: {
                files: ['less/**/*'],
                tasks: 'less',
                options: {
                    interrupt: true
                }
            }
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'js/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        karma: {
            unit: {
                configFile: 'test/unit/karma.conf.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');    

    var webdriver = grunt.option('webdriver') || 'phantomjs';
    var reporter = grunt.option('reporter') || 'spec';

    grunt.registerTask('test', 'Run full test suite', [
        // 'jshint',
        'karma'
    ]);

    // Default task.
    grunt.registerTask('default', 'Build the LESS for testing', [
        'clean',
        'shell:bower',
        'less',
        'test'
    ]);

};
