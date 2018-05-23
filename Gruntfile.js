(function() {
    "use strict";

    module.exports = function(grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON("package.json"),

            ts: {
                default: {
                    tsconfig: "./tsconfig.json",
                    src: ["app/*.ts", "!node_modules/**/*.ts"]
                }
            },

            jshint: {
                all: ["Gruntfile.js", "app/*.js", "app/**/*.js"]
            },

            less: {
                dist: {
                    options: {
                        compress: true,
                        cleancss: true,
                        sourcemap: false,
                        outputSourceFiles: true
                    },
                    files: [
                        {
                            expand: true,
                            src: ["app/**/*.less"],
                            dest: "temp/css/",
                            ext: ".css"
                        }
                    ]
                }
            },

            concat: {
                css: {
                    options: {
                        separator: ";"
                    },
                    src: [
                        "/vendor/reset-css/reset.css",
                        "/vendor/bootstrap/dist/bootstrap.css",
                        "temp/css/**/*.css"
                    ],
                    dest: "dist/css/app.css"
                },
                js: {
                    options: {
                        separator: ";"
                    },
                    src: ["app/*.js", "app/**/*.js"],
                    dest: "temp/js/app.js"
                }
            },

            uglify: {
                dest: {
                    options: {
                        mangle: true
                    },
                    files: {
                        "dist/js/app.js": ["temp/js/*.js"]
                    }
                }
            },

            connect: {
                server: {
                    options: {
                        hostname: "localhost",
                        port: 4000,
                        livereload: true
                    }
                }
            },

            watch: {
                dist: {
                    options: {
                        atBegin: true
                    },
                    files: [
                        "Gruntfile.js",
                        "app/*.js",
                        "app/**/*.js",
                        "styles/*.less",
                        "app/*.html",
                        "app/**/*.html"
                    ],
                    tasks: ["less", "concat", "uglify"]
                }
            }
        });

        grunt.loadNpmTasks("grunt-ts");
        grunt.loadNpmTasks("grunt-contrib-jshint");
        grunt.loadNpmTasks("grunt-contrib-less");
        grunt.loadNpmTasks("grunt-contrib-connect");
        grunt.loadNpmTasks("grunt-contrib-watch");
        grunt.loadNpmTasks("grunt-contrib-uglify");
        grunt.loadNpmTasks("grunt-contrib-concat");

        grunt.registerTask("default", [
            "ts",
            // "jshint",
            "less",
            "concat",
            "uglify",
            "connect",
            "watch"
        ]);
    };
})();
