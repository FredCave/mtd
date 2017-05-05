module.exports = function ( grunt ) {

	// Configure tasks
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		copy: {
			main: {
				expand: true,
				cwd: 'assets/js/',
				src: '**',
				dest: 'assets/js/dest/',
				flatten: true,
				filter: 'isFile',
			},
		},
		uglify: {
			dev: {
				beautify: true,
				src: "assets/js/dest/*.js",
				dest: "js/scripts.min.js"
			}
		},
		sass: {
			dist: {
			    options: {
			      style: 'expanded',
			      lineNumbers: true, // 1
			      sourcemap: 'none'
			    },
			    files: [{
			      expand: true, // 2
			      cwd: 'assets/css/',
			      src: [ '**/*.scss' ],
			      dest: 'assets/css',
			      ext: '.css'
			    }]
			}
		},
		watch: {
			js: {
				files: ["assets/js/**"],
				tasks: ["copy:main","uglify:dev"]
			},
			grunt: { files: ['gruntfile.js'] },
			css: {
				files: 'assets/css/*.scss',
				tasks: ['sass',"cssmin"]
			}
		},
		cssmin: {
			my_target: {
			    files: [{
			      expand: true,
			      cwd: 'assets/css/',
			      src: [ '*.css', '!*.min.css' ], // 1
			      dest: '',
			      ext: '.min.css'
			    }]
			  }
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Register tasks
	grunt.registerTask("default", ["uglify:dev"]);

}