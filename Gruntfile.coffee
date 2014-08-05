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
      build: ['build/*']
      deploy: ['deploy/public/*']

    copy:
      api:
        expand: true,
        cwd: 'src/api',
        src: ['**'],
        dest: 'build/api'
      img:
        expand: true,
        cwd: 'src/img',
        src: ['**'],
        dest: 'build/img'
      font:
        expand: true,
        cwd: 'src/font',
        src: ['**'],
        dest: 'build/font'
      html:
        expand: true,
        cwd: 'src',
        src: ['**.html', '!index.html'],
        dest: 'build'

    targethtml:
      dist:
        options:
          curlyTags:
            version: '<%= pkg.version %>'
            rlsdate: '<%= grunt.template.today("yyyymmddHHMM") %>'
        files:
          'build/index.html': 'src/index.html'

    uglify:
      build:
        files:
          'build/js/require.min.js': ['src/js/libs/require.js']

    requirejs:
      build:
        options:
          # appDir: 'src'
          # dir: 'build'
          baseUrl: 'src/js'
          mainConfigFile: 'src/js/app.js'
          name: 'app',
          include: [
            'controllers/accountController'
            'controllers/appointController'
            'controllers/auditController'
            'controllers/certController'
            'controllers/collectController'
            'controllers/departmentController'
            'controllers/depositoryController'
            'controllers/loginController'
            'controllers/passwordController'
            'controllers/profileController'
            'controllers/protocalController'
            'controllers/reviewController'
            'controllers/riskController'
            'controllers/videoController'
          ]
          out: 'build/js/app.min.js'
          preserveLicenseComments: false

    connect:
      src:
        options:
          port: 3001
          base: 'src/'
      build:
        options:
          port: 4001
          base: 'build'

    less:
      src:
        options:
          strictImports: false
        files:
          'src/css/app.css': 'src/less/app.less'
      build:
        options:
          strictImports: false
          cleancss: true
          report: 'min'
        files:
          'build/css/app.min.css': 'src/less/app.less'

    watch:
      src:
        files: ['src/less/**/*.less']
        tasks: ['less:src']
      build:
        files: []
        tasks: []

    jshint:
      options:
        jshintrc: '.jshintrc'
        reporter: require('jshint-stylish')
      all: ['src/js/*', '!src/js/libs']

    shell:
      deploy:
        command: 'rsync -avzl --delete build/** deploy/public'

  grunt.registerTask 'default', ['dev']
  grunt.registerTask 'dev', ['less:src', 'connect:src', 'watch:src']
  grunt.registerTask 'test', ['jshint']
  grunt.registerTask 'build', ['clean:build', 'requirejs', 'uglify', 'less:build', 'targethtml', 'copy']
  grunt.registerTask 'serve', ['connect:build', 'watch:build']
  grunt.registerTask 'deploy', ['shell']
