module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                force: true,
                reporterOutput: ""
            },
            build: ['Grunfile.js', 'src/**/*.js']
            //all: ['Grunfile.js', 'src/js/*.js']
        },

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n <%= pkg.author %>\n*/\n'
            },
            build: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': 'src/**/*.js',
                    'wwwroot/js/<%= pkg.name %>.min.js': 'dist/js/<%= pkg.name %>.min.js'
                }
            }
        },

        // compile scss stylesheets to css -----------------------------------------
        sass: {
            options: {
                style: 'expanded'
            },
            dist: {
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },

        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n <%= pkg.author %>\n*/\n'
            },
            build: {
                files: {
                    'wwwroot/css/<%= pkg.name %>.min.css': 'dist/css/main.css'
                }
            }
        },

        // configure watch to auto update ------------------------------------------
        watch: {
            stylesheets: {
                files: ['src/css/<%= pkg.name %>.css', 'src/scss/*.scss'],
                tasks: ['sass', 'cssmin']
            },
            scripts: {
                files: 'src/js/*.js',
                tasks: ['jshint', 'uglify']
            }
        }

    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // ===========================================================================
    // CREATE TASKS ==============================================================
    // ===========================================================================
    grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'cssmin']);

};
