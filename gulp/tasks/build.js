var gulp = require('gulp'),
settings = require('../../settings'),
imagemin = require('gulp-imagemin'),
del = require('del'),
cleanCSS = require('gulp-clean-css'),
uglify = require('gulp-uglify');

gulp.task('deleteDistFolder', function() {
  return del(settings.themeLocation + 'dist');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
  var pathsToCopy = [
    settings.themeLocation + '**/*',
    settings.themeLocation + '**/*.php',
    '!' + settings.themeLocation + 'node_modules',
    '!' + settings.themeLocation + 'node_modules/**',
    '!' + settings.themeLocation + 'assets/images/',
    '!' + settings.themeLocation + 'assets/images/**',
    '!' + settings.themeLocation + 'assets/images/icons',
    '!' + settings.themeLocation + 'assets/images/icons/**',
    '!' + settings.themeLocation + 'assets/styles',
    '!' + settings.themeLocation + 'assets/styles/**',
    '!' + settings.themeLocation + 'assets/scripts',
    '!' + settings.themeLocation + 'assets/scripts/**',
    '!' + settings.themeLocation + '*.js',
    '!' + settings.themeLocation + '*.json',
    '!' + settings.themeLocation + 'gulp',
    '!' + settings.themeLocation + 'gulp/**',
    '!' + settings.themeLocation + 'style.css'
  ]

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest(settings.themeLocation + 'dist'));
});

gulp.task('optimizeImages', ['deleteDistFolder', 'icons'], function() {
  return gulp.src([settings.themeLocation + 'assets/images/**/*', '!'+ settings.themeLocation + 'assets/images/icons', '!'+ settings.themeLocation + 'assets/images/icons/**/*'])
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
    ]))
    .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('minify-css', ['deleteDistFolder', 'styles'], function() {
  return gulp.src(settings.themeLocation + 'style.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(settings.themeLocation + 'dist'));
});

gulp.task('uglify-js', ['deleteDistFolder', 'scripts'], function () {
  return gulp.src([settings.themeLocation + 'assets/scripts/*-bundled.js', '!'+ settings.themeLocation + 'assets/scripts/modernizr.js'])
    .pipe(uglify())
    .pipe(gulp.dest(settings.themeLocation + 'dist/assets/scripts'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'minify-css', 'uglify-js']);
