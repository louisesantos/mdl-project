var path = require('path');

module.exports = function(grunt) {

    /* Initialize ------------------------------------------- */
    require('load-grunt-tasks')(grunt);
    require('grunt-newer');

    /* Imports ------------------------------------------- */
    var compass = require('compass-importer');

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
            fonts: '/fonts',
            views: './views',
            ts: './ts'
        },

        pkg: grunt.file.readJSON('package.json'),

        /* Clean ------------------------------------------- */
        clean: {
            build: {
                src: ['<%= paths.public %>', './server'] // './test
            }
        },

        /* Copies ------------------------------------------- */
        copy: {
            main: {
                expand: true,
                cwd: '<%= paths.app %><%= paths.fonts %>',
                src: '**',
                dest: '<%= paths.public %><%= paths.fonts %>',
            },

            favicon: {
                expand: false,
                flatten: true,
                src: ['<%= paths.app %>/favicon.ico'],
                dest: '<%= paths.public %>/favicon.ico',
                filter: 'isFile'
            },

            jquery: {
                expand: false,
                flatten: true,
                src: ['<%= paths.app %><%= paths.js %>/jquery.js'],
                dest: '<%= paths.public %><%= paths.js %>/jquery.js',
                filter: 'isFile'
            },

            styleguideJS: {
                expand: false,
                flatten: true,
                src: ['<%= paths.public %><%= paths.js %>/nv-framework.min.js'],
                dest: './src/styleguide/core/doc_assets/nv-framework.min.js',
                filter: 'isFile'
            },

            styleguideCSS: {
                expand: false,
                flatten: true,
                src: ['<%= paths.public %><%= paths.css %>/nv-framework.min.css'],
                dest: './src/styleguide/core/doc_assets/nv-framework.min.css',
                filter: 'isFile'
            },

            upload: {
              expand: true,
              cwd: '<%= paths.app %>/uploads',
              src: '**',
              dest: '<%= paths.public %>/uploads/',
            }
        },

        /* Uglify ------------------------------------------- */
        uglify: {
			uglify_client_js_files_pages: {
				expand: true,
				cwd: '<%= paths.app %><%= paths.js %>/pages/',
				src: ['*.js', '!*.min.js'],
				dest: '<%= paths.public %><%= paths.js %>/pages/',
				ext: '.min.js'
			},

			uglify_client_js_files: {
				files: [{
                    // NETVIAGEM
                    "<%= paths.public %><%= paths.js %>/nv-master.min.js": 
                    ['!*.min.js', 
                    '<%= paths.app %><%= paths.js %>/lib/*.js',
					'<%= paths.app %><%= paths.js %>/components/*.js',
					// '<%= paths.app %><%= paths.js %>/workarounds.js',
					'<%= paths.app %><%= paths.js %>/nv-common.js',
					'<%= paths.app %><%= paths.js %>/nv-master.js'
					],
                    // MDL
                    "<%= paths.public %><%= paths.js %>/nv-framework.min.js": 
                    ["./node_modules/material-design-lite/material.js"],
                    // METRICS
                    // "<%= paths.public %><%= paths.js %>/nv-metrics.min.js": 
                    // ['<%= paths.app %><%= paths.js %>/nv-metrics.js']
				}]
			},

			options: {
				// 'mangle': {
				// 	except: ["for", "class"]
				// },
				'compress': {},
				'beautify': false,
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
        
        /* Concat ------------------------------------------- */
        // concat: {
		// 	options: {
		// 		separator: ';',
		// 	},
		// 	dist: {
		// 		src: ['<%= paths.app %><%= paths.js %>/lib/*.js',
		// 			'<%= paths.app %><%= paths.js %>/components/*.js',
		// 			'<%= paths.app %><%= paths.js %>/nv-common.js'
		// 		],
		// 		dest: '<%= paths.public %><%= paths.js %>/nv-framework.js',
		// 	}
        // },
        
        /* Sass ------------------------------------------- */
        sass: {
            options: {
                includePaths: ['./node_modules/material-design-lite/src']
            },
            dist: {
                options: {
                    style: 'expanded',
                    importer: compass,
                    sourceMap: true,
                    outputStyle: 'compressed',
                    loadPath: 'node_modules/material-design-lite/src'
                },
                files: {
                    "<%= paths.public %><%= paths.css %>/nv-master.min.css":
                    "<%= paths.app %><%= paths.sass %>/nv-master.scss",

                    "<%= paths.public %><%= paths.css %>/nv-pages.min.css":
                    "<%= paths.app %><%= paths.sass %>/nv-pages.scss",

                    "<%= paths.public %><%= paths.css %>/nv-framework.min.css":
                    "<%= paths.app %><%= paths.sass %>/nv-framework.scss"
                }
            },
        },

        /* Watches ------------------------------------------- */
        watch: {
            watch_js_client_files: {
                files: ['<%= paths.app %><%= paths.js %>/**/*.js', 
                        '!<%= paths.app %><%= paths.jss%>/pages/*.js'],
				tasks: ['uglify:uglify_client_js_files', 'jshint'] //  'concat:dist',
			},
			watch_js_client_files_pages: {
				files: ['<%= paths.app %><%= paths.js %>/pages/*.js'],
				tasks: ['uglify:uglify_client_js_files_pages', 'jshint']
			},
			watch_ts_routes: {
				files: ['<%= paths.ts %>/routes/*.ts', '<%= paths.ts %>/app.ts'],
				tasks: ['tsc']
			},
			watch_ts_modules: {
				files: ['<%= paths.ts %>/modules/**/*.ts', '<%= paths.ts %>/app.ts'],
				tasks: ['tsc']
			},
			// watch_ts_tests: {
			// 	files: ['./ts/test/**/*.ts'],
			// 	tasks: ['tsc']
			// },
            watch_sass_files: {
                files: ['<%= paths.app %><%= paths.sass %>/**/*.scss'],
                tasks: ['sass']
            },
            watch_image_files: {
                files: ['<%= paths.app %><%= paths.img %>/**/*.{png,jpg,gif,svg,ico}'],
                tasks: ['image']
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

        /* Hologramas ------------------------------------------- */
        hologram: {
            generate: {
                options: {
                    config: './src/styleguide/core/hologram_config.yaml'
                }
            }
        },

        /* jshint ------------------------------------------- */
        jshint: {
            options: {
                curly: false,
                eqeqeq: false,
                eqnull: true,
                browser: true,
                devel: true,
                globals: {
                    "$": false,
                    "jQuery": false,
                    "google": ""
                },
            },
            uses_defaults: ['<%= paths.app %><%= paths.js %>/components/**/*.js',
                '<%= paths.app %><%= paths.js %>/pages/**/*.js',
                '<%= paths.app %><%= paths.js %>/imports/**/*.js'],

            uses_defaults: ['<%= paths.app %><%= paths.js %>/components/*.js',
                            '!<%= paths.app %><%= paths.js %>/components/nv-metrics.js',
                            '<%= paths.app %><%= paths.js %>/pages/*.js',
                            '<%= paths.app %><%= paths.js %>/*.js'],
            with_overrides: {
                options: {
                    curly: false,
                    undef: true,
                },
                files: {
                    src: ['<%= paths.app %><%= paths.js %>/*.js']
                },
            }
        },

        /* SCSS Lint ------------------------------------------- */
        scsslint: {
            allFiles: [
                '<%= paths.app %><%= paths.sass %>/**/.scss'
            ],

            options: {
                config: null,
                reporterOutput: 'scss-lint-report.xml',
                colorizeOutput: true
            },
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
                src: ['public/**', 'views/**', '.ebextensions/**', 'package.json', 'newrelic.js', 'server/**'],
                dest: ''},
            ]
          }
        },

        /* Typescript ------------------------------------------- */
        ts: {
            default: {
                tsconfig: true,
            }
        },
    });

    /* Tasks ------------------------------------------- */
    grunt.registerTask('default', ['browserSync', 'watch']); //dev e debug

	// Faz um build do Projeto para desenvolvimento
	grunt.registerTask('build', function (param) {
		var tasks = (process.argv[3] === "--dev") ? ['tsc', 'uglify', 'sass'] : ['clean', 'version', 'tsc', 'copy', 'uglify', 'sass', 'image'];
		grunt.task.run(tasks);
	});

	// Gera o Styleguide
	grunt.registerTask('styleguide', function (param) {
		if (param === "build") grunt.task.run('build');
		grunt.task.run(['copy:styleguideCSS', 'copy:styleguideJS', 'hologram']);
	});

	grunt.registerTask('version', 'Writes version of build to environment variables to AWS', function () {
		var fs = require('fs');
		// var someFile = '.ebextensions/00_environment.config';
		// var data = fs.readFileSync(someFile + ".temp", 'utf8');
		// var result = data.toString().replace(/\{\{VERSION\}\}/g, process.env.BUILD_NUMBER || 1);
		// fs.writeFileSync(someFile, result, 'utf8');
	})

	grunt.registerTask('tsc', 'Builds typescript calling tsc', function () {
		var done = this.async();
		grunt.util.spawn({
			cmd:'node',
			args:['node_modules/typescript/bin/tsc','--listFiles','true']
		},function(error,result,code){
			if(!error){
				grunt.log.ok(result.stdout,'Sucesso no tsc');
			}else{
				grunt.log.error(result,'Error no tsc');
				grunt.log.error(result.stdout);
				grunt.fail.warn(error);
			}
			done(error);
		})
	});
};