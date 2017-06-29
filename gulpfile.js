'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var validate = require('gulp-w3c-css');

var path = require('path');
var gutil = require('gulp-util');

var srcPath = './assets/css/*.css';
var dstPath = './build';

var htmlhint = require("gulp-htmlhint");

const babel = require('gulp-babel');

var beautify = require('gulp-beautify');

var stripDebug = require('gulp-strip-debug');

var rename = require("gulp-rename");

var htmlmin = require('gulp-htmlmin');

gulp.task('minify', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/main'));
});

// rename via string
gulp.task('name', function () {
  return gulp.src("./assets/images/loc.png")
    .pipe(rename("main/text/ciao/goodbye.md"))
    .pipe(gulp.dest("./dist")); // ./dist/main/text/ciao/goodbye.md
});


gulp.task('strip', function () {
    return gulp.src('./assets/**/*.js')
        .pipe(stripDebug())
        .pipe(gulp.dest('./dist'));
});


gulp.task('beautify', function() {
  gulp.src('./assets/js/test.js')
    .pipe(beautify({indent_size: 2}))
    .pipe(gulp.dest('./public/'))
});

gulp.task('babel', () => {
    return gulp.src('./assets/js/test.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task("htmlhint", function (){
  return gulp.src("index.html")
      .pipe(htmlhint())
      .pipe(htmlhint.failReporter())
});

gulp.task('validate', function(){
  return gulp.src(srcPath)
    .pipe(validate())
    .pipe(gulp.dest(dstPath));
});

gulp.task('sass', function() {
  return gulp.src('./assets/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/'));
});


gulp.task('html', ["htmlhint",
                   "name",
                   "minify"]);

gulp.task('css', ['sass',
                  'validate']);

gulp.task('js', ["babel",
                 "beautify",
                 "strip"]);

gulp.task("default", ["html", "css", "js"]);

                //  gulp.task('js', ["strip"]);
