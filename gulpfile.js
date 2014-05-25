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
    return browserify('./node_modules/tneb/game.js')
    .transform(hbsfy)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(base + 'js/'));
});

gulp.task('move-templates', function(){
    return gulp.src('./node_modules/tneb-templates/**/*.hbs', {base : './node_modules/tneb-templates/'})
    .pipe(gulp.dest('./src/views/tneb-templates'));
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

gulp.task('move-main', function(){
    return gulp.src('./node_modules/tneb/**/*.js', {base : './node_modules/tneb/'})
    .pipe(gulp.dest('./src/js/tneb'));
});

gulp.task('dev', function(){
    base = './dev/';
    return gulp.run('sass', 'move-static', 'browserify');
});

gulp.task('src', ['move-main','move-templates']);

gulp.task('watch', function(){
    base = "./dev/";
    gulp.watch(['./node_modules/tneb/**/*.js','./node_modules/tneb-templates/**/*.hbs'], ['browserify']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/index.html',['move-static']);
});

gulp.task('default', ['browserify','move-static', 'sass']);