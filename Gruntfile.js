module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        html2jade: {
            options: {
                // Task-specific options go here.
            },
            your_target: {
                src: 'lib/client/dist/index.html',
                dest: 'lib/client/dist/index.jade'
                // Target-specific file lists and/or options go here.
            },
        },

        replace: {
            dist: {
                options: {
                    patterns: [{
                        match: /kue/g,
                        replacement: '#{baseURL}'
                    }]
                },
                files: [{src: ['lib/client/dist/index.jade'], dest: 'lib/client/tmp/'}]
            }
        }
    });
};
