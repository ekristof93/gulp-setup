var settings = require('../../settings'),
gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function() {

  var files = [
    settings.themeLocation + 'style.css',
    settings.themeLocation + '**/*.php'
  ];
	
  browserSync.init(files, {
    proxy: settings.urlToPreview,
    notify: false
  });

  watch('./**/*.php', function() {
    browserSync.reload();
  });

  watch(settings.themeLocation + 'assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });

  watch([settings.themeLocation + 'assets/scripts/**/*.js', '!' + settings.themeLocation + 'assets/scripts/**/*-bundled.js', '!' + settings.themeLocation + 'assets/scripts/**/modernizr.js'], function() {
    gulp.start('scriptsRefresh');
  })

});

gulp.task('cssInject', ['styles'], function() {
  return gulp.src(settings.themeLocation + 'styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
  browserSync.reload();
});
