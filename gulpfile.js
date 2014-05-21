var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

var base = "./dist/";
var scssFiles = [
    './src/scss/variables.scss',
    './src/scss/normalize.scss',
    './src/scss/h5bp.scss',
    './src/scss/main.scss'
];

gulp.task('browserify', function(){
    console.log(arguments);
    return browserify('./src/js/tneb/game.js', {paths : ['./node_modules', './src/js/game'] })
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

gulp.task('fuckingwindows', function(){
    return gulp.src('./src/js/tneb/**/*.js', {base : './src/js/tneb/'})
    .pipe(gulp.dest('./node_modules/tneb'));
});

gulp.task('watch', function(){
    base = "./dev/";
    gulp.watch('./src/js/tneb/**/*.js', ['fuckingwindows', 'browserify']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    //gulp.watch('./src/js/game/**/*.js',['browserify']);
    gulp.watch('./src/index.html',['move-static']);
});

gulp.task('default', ['browserify','move-static', 'sass']);