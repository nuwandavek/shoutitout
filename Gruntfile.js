module.exports = function(grunt) {

	grunt.initConfig({
		clean: ['dist'],
		copy: {
			dist: {
				files: [{
					expand: true,
					src: ['index.html','jsmain.js','cssmain.css', 'next.html','data.js','arnab.jpg','fbog.jpg','jquery.waypoints.min.js','refmig.jpg'],
					dest: 'dist/'
				}]
			}
		},
				
		'gh-pages': {
			options: {
				base: 'dist'
			},
			src: ['**']
		}
	});

    grunt.registerTask('build', ['clean', 'copy:dist']);

	require('load-grunt-tasks')(grunt);
};
