module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },
            jekyllServe: {
                command: 'jekyll serve'
            }
        },
        watch: {
            files: [
                '_includes/*.html',
                '_layouts/*.html',
                '_posts/*.markdown',
                'css/*.css',
                '_config.yml',
                'index.html'
            ],
            tasks: ['shell:jekyllBuild', 'shell:jekyllServe'],
            options: {
                interrupt: true,
                atBegin: true,
                livereload: true
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                report: 'gzip'
            },
            combine: {
                // options for combining files
                // we have defined cssFiles variable to hold our file names at the top
                files: {
                    // here key part is output file which will our <package name>.min.css
                    // value part is set of input files which will be combined/minified
                    'assets/css/<%= pkg.name %>.min.css': ['assets/css/**/*.css']
                }
            }
        },
        htmlmin: {
            options: {
                removeComments: 'true',
                collapseWhitespace: 'true',
                removeAttributeQuotes: 'true',
                removeRedundantAttributes: 'true',
                removeEmptyAttributes: 'true',
                removeOptionalTags: 'true'
            },
            dist: {
                files: {
                  '_site/**/*.html':'_site/**/*.html'
                }
            }
        }
    });

    // Load plugins.
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Default task(s).
    grunt.registerTask('default', ['cssmin']);
    grunt.registerTask('dist', ['shell:jekyllBuild', 'cssmin', 'htmlmin:dist']);

};
