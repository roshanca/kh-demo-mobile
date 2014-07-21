module.exports = (grunt) ->

  # Loads all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    meta:
      banner:
        '/* <%= pkg.name %> \n' +
        ' * version: <%= pkg.version %>\n' +
        ' * project: <%= pkg.project %>\n' +
        ' * update: <%= grunt.template.today(\'yyyy-mm-dd\") %>\n' +
        ' * Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %> <<%=pkg.author.email%>>; \n' +
        ' */\n\n'

    clean:
      dist: ['dist/*']

    requirejs:
      compile:
        options:
          mainConfigFile: 'src/app.js'
          name: 'app'
          out: 'dist/app.min.js'
          preserveLicenseComments: false

    connect:
      server:
        options:
          port: 3001
          base: 'src/'

    less:
      development:
        options:
          strictImports: false
        files:
          'src/css/app.css': 'src/less/app.less'

    watch:
      server:
        files: ['src/less/**/*.less']
        tasks: ['less:development']

  grunt.registerTask 'release', ['clean', 'requirejs']
  grunt.registerTask 'server', ['connect:server', 'watch:server']

