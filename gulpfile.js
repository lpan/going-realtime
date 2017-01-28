const gulp = require('gulp');
const concat = require('gulp-concat');
const cached = require('gulp-cached');
const remember = require('gulp-remember');
const uglify = require('gulp-uglify');

var scriptsGlob = 'src/client/**/*.js';

gulp.task('scripts', () => gulp.src(scriptsGlob)
  .pipe(cached('scripts'))
  .pipe(remember('scripts'))
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/')));

gulp.task('watch', () => {
  const watcher = gulp.watch(scriptsGlob, ['scripts']);
  watcher.on('change', (event) => {
    if (event.type === 'deleted') {
      delete cached.caches.scripts[event.path];
      remember.forget('scripts', event.path);
    }
  });
});

gulp.task('default', ['scripts', 'watch']);
