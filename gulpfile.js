var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    webpack = require('gulp-webpack'),
    webpackConfig = require('./webpack.config'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean-css'),
    path = require('path'),
    babel = require('babel-register');

gulp.task('test', function () {
    return gulp
        .src(['./test/**/*-spec.js'], { read: false })
        .pipe(mocha({ reporter: 'spec', timeout: 2000, compilers: { js: babel } }));
});

gulp.task('bundle', ['bundle-css','bundle-js']);

gulp.task('bundle-js', function () {
    gulp
        .src('client/index.jsx')
        .pipe(webpack(webpackConfig('index')))
        .pipe(uglify())
        .pipe(gulp.dest('static/'));
    gulp
      .src('client/product.jsx')
      .pipe(webpack(webpackConfig('product')))
      .pipe(uglify())
      .pipe(gulp.dest('static/'))
});

gulp.task('bundle-css', function () {
    gulp
        .src(['client/css/*.scss', 'client/css/*.css'])
        .pipe(sass())
        .pipe(clean())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('static/'));
});
