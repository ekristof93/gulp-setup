var gulp = require('gulp'),
settings = require('../../settings'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

var config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    defs: true,
    inline: true
  }
}

gulp.task('beginClean', function() {
  return del([settings.themeLocation + 'assets/sprites', settings.themeLocation + 'assets/images/sprite.defs.svg']);
});

gulp.task('createSprite', ['beginClean'], function() {
  return gulp.src(settings.themeLocation + 'assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest(settings.themeLocation + 'assets/sprites/'));
});

gulp.task('copySpriteGraphic', ['createSprite'], function() {
  return gulp.src(settings.themeLocation + 'assets/sprites/defs/svg/*.{svg,png}')
    .pipe(gulp.dest(settings.themeLocation + 'assets/images/'));
});

gulp.task('endClean', ['copySpriteGraphic'], function() {
  return del(settings.themeLocation + 'assets/sprites');
});

gulp.task('icons', ['createSprite', 'copySpriteGraphic', 'endClean']);