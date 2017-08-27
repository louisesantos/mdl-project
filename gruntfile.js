var path = require('path');

module.exports = function(grunt) {

    /* Initialize ------------------------------------------- */
    require('load-grunt-tasks')(grunt);

    grunt.file.defaultEncoding = 'utf8';
    grunt.initConfig({

        /* Variables ------------------------------------------- */
        paths: {
            public: './public',
            app: './src/app',
            sass: '/sass',
            css: '/stylesheets',
            js: '/javascripts',
            img: '/img',
        },

        pkg: grunt.file.readJSON('package.json'),

        /* Clean ------------------------------------------- */
        clean: {
            build: {
                src: ['<%= paths.public %>']
            }
        },

        /* Copies ------------------------------------------- */
        copy: {
            img: {
                expand: true,
                cwd: '<%= paths.app %><%= paths.img %>',
                src: '**',
                dest: '<%= paths.public %><%= paths.img %>',
            },
        },

        /* Uglify ------------------------------------------- */
        uglify: {
            uglify_client_js_files: {
                files: [{
                    "<%= paths.public %><%= paths.js %>/main.min.js":
                    ['<%= paths.app %><%= paths.js %>/main.js'],
                    
                    "<%= paths.public %><%= paths.js %>/mdl.min.js":
                    ["./node_modules/material-design-lite/material.js"]
                }]
            },

            options: {
                "mangle":false,
                'compress': false,
                'beautify': true,
                'expression': false,
                'report': 'min',
                'sourceMap': false,
                'sourceMapName': undefined,
                'sourceMapIn': undefined,
                'sourceMapIncludeSources': false,
                'exportAll': false,
                'preserveComments': undefined,
                'banner': '/*Uglify*/',
                'footer': '',
                'screwIE8': false,
                'quoteStyle': 3
            }
        },
        
        /* Sass ------------------------------------------- */
        sass: {
            options: {
                includePaths: ['./node_modules/material-design-lite/src']
            },
            dist: {
                options: {
                    style: 'expanded',
                    sourceMap: true,
                    outputStyle: 'compressed',
                    loadPath: 'node_modules/material-design-lite/src'
                },
                files: {
                    "<%= paths.public %><%= paths.css %>/main.min.css":
                    "<%= paths.app %><%= paths.sass %>/main.scss",

                    "<%= paths.public %><%= paths.css %>/mdl.min.css":
                    "<%= paths.app %><%= paths.sass %>/mdl-custom.scss"
                }
            },
        },

        /* Watches ------------------------------------------- */
        watch: {
            watch_sass_files: {
                files: ['<%= paths.app %><%= paths.sass %>/**/*.scss'],
                tasks: ['sass']
            }
        },

        /* Imagens ------------------------------------------- */
        image: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.app %><%= paths.img %>',
                    src: ['**/*.{png,jpg,gif,svg,ico,json,xml}'],
                    dest: '<%= paths.public %><%= paths.img %>'
                }]
            }
        },

        /* BrowserSync ------------------------------------------- */
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        '<%= paths.public %><%= paths.css %>/**/*.css',
                        '<%= paths.public %><%= paths.js %>**/*.js',
                        './app.js',
                        '.<%= paths.views %>/components/**/*.hbs',
                        '<%= paths.views %>/pages/**/*.hbs',
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: "http://localhost:8000/"
                }
            }
        },

        /* Compress ------------------------------------------- */
        compress: {
          main: {
            options: {
              archive: 'archive.zip'
            },
            files: [{
                src: ['public/**', 'package.json'],
                dest: ''},
            ]
          }
        },
    });

    /* Tasks ------------------------------------------- */
    grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('build', ['clean', 'copy', 'uglify', 'sass', 'image']);
};