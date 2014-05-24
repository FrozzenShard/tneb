var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var hbsfy = require('hbsfy');

var base = "./dist/";
var scssFiles = [
    './src/scss/variables.scss',
    './src/scss/normalize.scss',
    './src/scss/h5bp.scss',
    './src/scss/main.scss'
];

gulp.task('browserify', function(){
    return browserify('./src/js/tneb/game.js', {paths : [ './node_modules', './src/js/', './src/views/'] })
    .transform(hbsfy)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(base + 'js/'));
});

gulp.task('move-static', function(){
    return  gulp.src('./src/index.html')
    .pipe(gulp.dest(base));
});
gulp.task('sass', function(){
    return gulp.src(scssFiles)
    .pipe(concat('all.scss'))
    .pipe(sass({sourcemap:true}))
    .pipe(gulp.dest( base + 'css'));
});

gulp.task('mochaplz', function(){
    return gulp.src('./src/js/tneb/**/*.js', {base : './src/js/tneb/'})
    .pipe(gulp.dest('./node_modules/tneb'));
});

gulp.task('dev', function(){
    base = './dev/';
    return gulp.run('sass', 'move-static', 'browserify');
});

gulp.task('watch', function(){
    base = "./dev/";
    gulp.watch('./src/js/tneb/**/*.js', ['browserify']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/index.html',['move-static']);
});

gulp.task('default', ['browserify','move-static', 'sass']);