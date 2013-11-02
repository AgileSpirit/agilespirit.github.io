module.exports = function(grunt) {

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
    }
  });

  // Load plugins.
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['shell']);

};
