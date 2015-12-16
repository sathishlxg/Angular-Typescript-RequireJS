module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat:{
			dist:{
				src: ["/vendor/reset-css/reset.css", "/vendor/bootstrap/dist/bootstrap.css"],
				dest: ["dist/app.css"]
			}
		}
	});

	//grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.registerTask("default", ["concat:dist"]);
};