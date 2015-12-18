;(function(){

	"use strict";

	module.exports = function(grunt){

		grunt.initConfig({
			pkg: grunt.file.readJSON("package.json"),

			jshint:{
				all: ["Gruntfile.js", "app/*.js", "app/**/*.js"]
			},		
			less:{
				dist:{
					options: {
						compress: true,
						cleancss: true,
						sourcemap: true,
						outputSourceFiles: true
					},
					files:[{
						expand: true,
						src: ["app/**/*.less"],
						dest: "temp/css/",
						ext: ".css"
					}]
				}
			},
			concat:{
				css:{
					options:{
						separator: ";"
					},
					src: ["/vendor/reset-css/reset.css", "/vendor/bootstrap/dist/bootstrap.css", "temp/css/**/*.css"],
					dest: "dist/css/app.css"
				},
				js:{
					options:{
						separator: ";"
					},
					src: ["app/*.js", "app/**/*.js"],
					dest: "temp/js/app.js"
				}
			},
			uglify:{
				dest:{
					options:{
						mangle:true,
					},
					files:{
						"dist/js/app.js": ["temp/js/*.js"]
					}
				}
			},		
			connect:{
				server:{
					options:{
						hostname: "localhost",
						port: 8080,
						livereload: true
					}
				}
			},
			watch:{
				dist:{
					options:{
						atBegin: true
					},
					files: ["Gruntfile.js", "app/*.js", "app/**/*.js", "styles/*.less", "app/*.html", "app/**/*.html"],
					tasks: ["jshint", "less", "concat", "uglify"]
				}
			}
		});

		grunt.loadNpmTasks("grunt-contrib-jshint");
		grunt.loadNpmTasks("grunt-contrib-less");
		grunt.loadNpmTasks("grunt-contrib-connect");
		grunt.loadNpmTasks("grunt-contrib-watch");
		grunt.loadNpmTasks("grunt-contrib-uglify");
		grunt.loadNpmTasks("grunt-contrib-concat");

		grunt.registerTask("default", ["jshint", "less", "concat", "uglify", "connect", "watch"]);
	};

})();