/* ===============================================================================
************   Import   ************
=============================================================================== */

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var stylish = require('jshint-stylish');
var runSequence = require('run-sequence');

/* ===============================================================================
************   Config   ************
=============================================================================== */

var serveConfig = {
	files: [
		'src/**/*.html',
		'src/js/**/*.js',
		'src/img/*.{png|gif}',
		'src/font/iconfont.{svg|ttf}',
		'src/mustache/*.mustache'
	],
	server: {
		baseDir: 'src/'
	}
};

var requireConfig = {
	baseUrl: 'src/js',
	mainConfigFile: 'src/js/app.js',
	name: 'app',
	paths: {
		'templates': '../template'
	},
	include: [
		'controllers/accountController',
		'controllers/accountListController',
		'controllers/appointController',
		'controllers/auditController',
		'controllers/certController',
		'controllers/collectController',
		'controllers/departmentController',
		'controllers/departmentsController',
		'controllers/depositoryController',
		'controllers/guideController',
		'controllers/loginController',
		'controllers/passwordController',
		'controllers/profileController',
		'controllers/protocalController',
		'controllers/reviewController',
		'controllers/riskController',
		'controllers/videoController',
		'controllers/provController',
		'controllers/cityController',
		'controllers/depsController'
	],
	out: 'app.js'
};

/* ===============================================================================
************   Task   ************
=============================================================================== */

gulp.task('browser-sync', function () {
	browserSync(serveConfig);
});

gulp.task('less', function () {
	return gulp.src('src/less/app.less')
		.pipe(plugins.less())
		.pipe(gulp.dest('src/css'))
		.pipe(reload({stream:true}));
});

gulp.task('lint', function () {
	return gulp.src(['src/js/**/*.js', '!src/js/libs/*.js', 'gulpfile.js'])
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter(stylish));
});

gulp.task('uglify', ['template'], function () {
	plugins.requirejs(requireConfig)
		.pipe(plugins.uglify())
		.pipe(plugins.rename({extname: '.min.js'}))
		.pipe(gulp.dest('build/js'));
});

gulp.task('requirejs', function () {
	return gulp.src('src/js/libs/require.js')
		.pipe(plugins.uglify())
		.pipe(plugins.rename({extname: '.min.js'}))
		.pipe(gulp.dest('build/js'));
});

gulp.task('replace', function () {
	return gulp.src('src/index.html')
		.pipe(plugins.htmlReplace({
			js: {
				src: [['js/app.min', 'js/require.min.js']],
				tpl: '<script data-main="%s" src="%s"></script>'
			},
			css: 'css/app.min.css'
		}))
		.pipe(gulp.dest('build'));
});

gulp.task('htmlmin', function () {
	return gulp.src(['src/**/*.html', '!src/index.html'])
		.pipe(plugins.minifyHtml({empty: true}))
		.pipe(gulp.dest('build'));
});

gulp.task('template', function () {
	return gulp.src('src/mustache/*')
		.pipe(plugins.minifyHtml({empty: true}))
		.pipe(gulp.dest('src/template'));
});

gulp.task('cssmin', function () {
	return gulp.src('src/css/app.css')
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename({extname: '.min.css'}))
		.pipe(gulp.dest('build/css'));
});

gulp.task('imagemin', function () {
	return gulp.src('src/img/*')
		.pipe(plugins.imagemin())
		.pipe(gulp.dest('build/img'));
});

gulp.task('copy', function () {
	return gulp.src(['src/api/*', 'src/font/*'], {base: './src'})
		.pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
	return gulp.src('build/*', {read: false}).pipe(plugins.rimraf());
});

/**
 * Default task, for developing
 * @return {[type]} [description]
 */
gulp.task('default', ['less', 'browser-sync'], function () {
	gulp.watch('src/less/**/*.less', ['less']);
});

/**
 * Build task
 */
gulp.task('compile', [
	'less',
	'requirejs'
]);

gulp.task('compress', [
	'htmlmin',
	'cssmin',
	'uglify',
	'imagemin'
]);

gulp.task('rest', [
	'copy',
	'replace'
]);

gulp.task('build', function () {
	runSequence('clean', 'compile', 'compress', 'rest', function () {
		console.log('All done!');
	});
});
