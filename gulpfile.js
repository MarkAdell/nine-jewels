var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var pump = require('pump');

gulp.task('scripts', function (cb) {
  pump([
        gulp.src(['public/app/*.js', 'public/app/**/*.js']),
        concat('scripts.js'),
        uglify({mangle: false}),
        rename({ suffix: '.min' }),
        gulp.dest('public/dist')
    ],
    cb
  );
});

gulp.task('css', function (cb) {
  pump([
        gulp.src('public/assets/css/styles.css'),
        cleanCSS({compatibility: 'ie8'}),
        rename({ suffix: '.min' }),
        gulp.dest('public/assets/css')
    ],
    cb
  );
});

gulp.task('watch', function() {
  gulp.watch(['public/app/*.js', 'public/app/**/*.js'], ['scripts']);
  gulp.watch('public/assets/css/styles.css', ['css']);
});

gulp.task('default', ['scripts', 'css', 'watch']);

