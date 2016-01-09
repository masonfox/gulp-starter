'use strict';
 
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
// var watch = require('gulp-watch');

// gulp.task('sass', function () {
//   gulp.src('./scss/**/*.scss')
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(gulp.dest('./css'))
//     .pipe(browserSync.stream());
// });
// 
// gulp.task('watch', function () {
//     return gulp.src('css/**/*.css')
//         .pipe(watch('./scss/**/*.scss'))
//         .pipe(gulp.dest('css'));
// });
// 
// gulp.task('serve', function() {
//     browserSync.init({
//         server: {
//             baseDir: './',
//             host: 'localhost'
//         }
//     });
// });
// 
// gulp.task('default', ['serve']);

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: './',
        host: 'localhost',
        browser: 'google chrome' // for now
    });

    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);


// gulp.task('sass:watch', function () {
//   gulp.watch('./scss/**/*.scss', ['sass']);
// });
