var gulp = require('gulp');
gulp.task('build',['styles','scripts','media']);

gulp.task('default', function (cb) {

    console.log('Gulp and running!')
    process.nextTick(cb);
});

var less = require('gulp-less');
var path = require('path');


gulp.task('less', function () {
    gulp.src(path.join(__dirname,'www/style/main.less'))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./public/style'));
});

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('scripts',['shiv'], function() {

    var bower_includes = [
        "jquery/dist/jquery.js",
        "bootstrap/dist/js/bootstrap.js"
    ].map(function(src){
        return path.join(__dirname,"./bower_components",src);
    });

    return gulp.src(bower_includes.concat([path.join(__dirname,'www/script/*.js')]))
        .pipe(concat('all.js', {newLine: ';'}))
        .pipe(gulp.dest(path.join(__dirname,'public/script')))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(__dirname,'public/script')));
});

gulp.task('shiv', function() {

    var bower_includes = [
        "html5shiv/dist/html5shiv.js"
    ].map(function(src){
            return path.join(__dirname,"./bower_components",src);
        });

    return gulp.src(bower_includes)

        //.pipe(rename('all.min.js'))

        .pipe(gulp.dest(path.join(__dirname,'public/script')));
});

gulp.task('media', function() {



    return gulp.src([path.join(__dirname,'www/media/*'),path.join(__dirname,'www/media/**/*')])

        //.pipe(rename('all.min.js'))

        .pipe(gulp.dest(path.join(__dirname,'public/media')));
});

gulp.task('styles', ['less'],function() {
    var bower_includes = [
        "bootstrap/dist/css/bootstrap.css"
    ].map(function(src){
        return path.join(__dirname,"./bower_components",src);
    });

    return gulp.src(bower_includes.concat([path.join(__dirname,'public/style/*.css'),
            "!"+path.join(__dirname,'public/style/site.css')]))
        .pipe(concat('site.css'))
        .pipe(gulp.dest(path.join(__dirname,'public/style')));

});

gulp.task('watch', function () {
    gulp.watch(path.join(__dirname,'www/**/*.less'), ['styles']);
});