module.exports = function(grunt) {
   grunt.initConfig({
   browserify: {
	   js: {
		   src: 'app/js/**/*.js',
		   dest: 'dist/js/app.js',
		   options: {
			 external: ['angular'],
			 debug: true,
			 browserifyOptions: { debug: true }
		   }
		}
   },
   copy: {
	   all: {
		   // This copies all the html and css into the dist/ folder
		   expand: true,
		   cwd: 'app/',
		   src: ['**/*.html', '**/*.png'],
		   dest: 'dist/'
		}
   },
   watch: {
	   js: {
       files: "app/**/*.js",
       tasks: "browserify"
     },
     html: {
       files: 'app/**/*.html',
       tasks: 'copy'
     },
     css: {
       files: 'app/**/*.scss',
       tasks: 'sass'
     },
     img: {
       files: 'app/**/*.png',
       tasks: 'copy'
     }
   },
   'http-server': {
	   dev: {           
       root: './dist',           
       port: 3000,
       openBrowser : true,
       runInBackground: true 
	}
   },
   sass: {                              // Task
       dist: {                            // Target
           options: {                       // Target options
               style: 'expanded'
           },
           files: [{
               expand: true,
               cwd: 'app/css',
               src: ['**/*.scss'],
               dest: 'dist/css',
               ext: '.css'
           }]
       }
   }
 });

 // Load the npm installed tasks
 grunt.loadNpmTasks('grunt-browserify');
 grunt.loadNpmTasks('grunt-contrib-copy');
 grunt.loadNpmTasks('grunt-contrib-watch');
 grunt.loadNpmTasks('grunt-http-server');
 grunt.loadNpmTasks('grunt-contrib-sass');

 // The default tasks to run when you type: grunt
 grunt.registerTask('default', ['browserify', 'copy', 'http-server', 'watch', 'sass']);
};