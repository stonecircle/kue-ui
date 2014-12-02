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
                dest: 'lib/client/tmp/index.jade'
            },
        },

        replace: {
            dist: {
                options: {
                    patterns: [{
                        match: /BASE_URL/g,
                        replacement: '#{baseURL}'
                    }]
                },
                files: [{expand: true, flatten: true,src: ['lib/client/tmp/index.jade'], dest: 'lib/client/dist/'}]
            }
        }
    });

    grunt.registerTask('build', ['shell', 'html2jade', 'replace']);

};
