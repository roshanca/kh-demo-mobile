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
        ' * update: <%= grunt.template.today(\"yyyy-mm-dd\") %>\n' +
        ' * Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %> <<%=pkg.author.email%>>; \n' +
        ' */\n\n'

    clean:
      dist: ['dist/*']

    copy:
      api:
        expand: true,
        cwd: 'src/api',
        src: ['**'],
        dest: 'dist/api'
      img:
        expand: true,
        cwd: 'src/img',
        src: ['**'],
        dest: 'dist/img'
      font:
        expand: true,
        cwd: 'src/font',
        src: ['**'],
        dest: 'dist/font'
      html:
        expand: true,
        cwd: 'src',
        src: ['**.html', '!index.html'],
        dest: 'dist'

    targethtml:
      dist:
        options:
          curlyTags:
            version: '<%= pkg.version %>'
            rlsdate: '<%= grunt.template.today("yyyymmddHHMM") %>'
        files:
          'dist/index.html': 'src/index.html'

    uglify:
      dist:
        files:
          'dist/js/require.min.js': ['src/lib/require.js']

    requirejs:
      dist:
        options:
          appDir: 'src'
          dir: 'dist'
          mainConfigFile: 'src/app.js'
          modules: [
            {
              name: 'app'
              include: [

              ]
            },
            {
              name: 'js/controllers/certController'
              include: [

              ]
            }
            {
              name: 'js/controllers/loginController'
              include: [

              ]
            }
          ]
          # name: 'app'
          # out: 'dist/app.min.js'
          preserveLicenseComments: false

    connect:
      src:
        options:
          port: 3001
          base: 'src/'

    less:
      src:
        options:
          strictImports: false
        files:
          'src/css/app.css': 'src/less/app.less'
      dist:
        options:
          strictImports: false
          cleancss: true
          report: 'min'
        files:
          'dist/css/app.min.css': 'src/less/app.less'

    watch:
      src:
        files: ['src/less/**/*.less']
        tasks: ['less:src']

    jshint:
      options:
        jshintrc: '.jshintrc'
        reporter: require('jshint-stylish')
      all: ['src/js/*', '!src/js/libs']

  grunt.registerTask 'default', ['dev']
  grunt.registerTask 'dev', ['less:src', 'connect:src', 'watch:src']
  grunt.registerTask 'test', ['jshint']
  grunt.registerTask 'dist', ['clean', 'requirejs', 'less:dist', 'copy', 'uglify', 'targethtml']

