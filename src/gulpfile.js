var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

var staticFiles = [
    './index.html'
];
var scssFiles = [
    './scss/normalize.scss',
    './scss/h5bp.scss',
    './scss/variables.scss',
    './scss/main.scss'
];

gulp.task('browserify', function(){
    return browserify('./js/game/game.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./../dist/js/'));
});
gulp.task('move-static', function(){
    return  gulp.src(staticFiles,{base : './'})
    .pipe(gulp.dest('./../dist/'));
});
gulp.task('sass', function(){
    return gulp.src(scssFiles)
    .pipe(concat('all.scss'))
    .pipe(sass({sourcemap:true}))
    .pipe(gulp.dest('./../dist/css'));
});

gulp.task('watch', function(){
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./js/game/**/*.js',['browserify']);
    gulp.watch('./index.html',['move-static']);
});

gulp.task('default', ['browserify','move-static', 'sass']);