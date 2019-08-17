var gulp = require('gulp'),
settings = require('../../settings'),
modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
  return gulp.src([settings.themeLocation + 'assets/styles/**/*.css', settings.themeLocation + 'assets/scripts/**/*.js'])
    .pipe(modernizr({
      "options": [
        "setClasses"
      ]
    }))
    .pipe(gulp.dest(settings.themeLocation + 'assets/scripts/'));
});
