module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        shell: {
            options: {
                stderr: true
            },
            target: {
                command: 'cd lib/client && ember build --environment production'
            }
        },

        html2jade: {
            your_target: {
                src: 'lib/client/dist/index.html',
                dest: 'lib/client/tmp/build.jade'
            },
        },

        replace: {
            dist: {
                options: {
                    patterns: [
                    {
                        match: /\/BASE_URL/g,
                        replacement: '#{baseURL}'
                    },
                    {
                        match: /API_URL/g,
                        replacement: '#{apiURL}'
                    }]
                },
                files: [{expand: true, flatten: true,src: ['lib/client/tmp/build.jade'], dest: 'lib/client/dist/'}]
            }
        }
    });

    grunt.registerTask('build', ['shell', 'html2jade', 'replace']);

};
