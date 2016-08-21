module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            'public/all.js': [
                'public/*.js',
                'public/lib/js/*.js'
            ],
            'public/all.css': [
                'public/*.css',
                'public/lib/css/*.css'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify']);

};
