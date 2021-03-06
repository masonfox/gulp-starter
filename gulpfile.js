'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var jade = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');
 
gulp.task('serve', ['sass', 'jade', 'js'], function() {

    browserSync.init({
        server: './',
        host: 'localhost',
        browser: 'google chrome' // for now
    });

    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./**/*.jade', ['jade']);
    gulp.watch('./js/*.js', ['js-watch']).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// gulp.task('autoprefixer', function () {
// 	return gulp.src('css/style.css')
// 		.pipe(autoprefixer({
// 			browsers: ['last 2 versions'],
// 			cascade: false
// 		}))
// 		.pipe(gulp.dest('css/style.css'));
// });

gulp.task('clean', function () {
    return gulp.src('js/min', {read: false})
      .pipe(clean());
});

gulp.task('js', ['clean'], function(){
    return gulp.src('./js/*.js')
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('js/min'))
        .pipe(rename('uglify.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/min'));
});
gulp.task('js-watch', ['js']);

gulp.task('jade', function() {
  return gulp.src('jade/**/*.jade')
    .pipe(jade()) // pip to jade plugin
    .pipe(gulp.dest('./')) // tell gulp our output folder
    .pipe(browserSync.stream());
});

// register main task
gulp.task('default', ['serve']);
