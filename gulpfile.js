var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    webpack = require('gulp-webpack'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean-css'),
    path = require('path'),
    babel = require('babel-register');

gulp.task('test', function () {
    return gulp
        .src(['./test/**/*-spec.js'], { read: false })
        .pipe(mocha({ reporter: 'spec', timeout: 20000, compilers: { js: babel } }));
});

gulp.task('bundle', ['bundle-css']);

gulp.task('bundle-js', function () {
    gulp
        .src('app/main.jsx')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(uglify())
        .pipe(gulp.dest('static/'));
});

gulp.task('bundle-css', function () {
    gulp
        .src(['client/css/*.scss', 'client/css/*.css'])
        .pipe(sass())
        .pipe(clean())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('static/'));
});