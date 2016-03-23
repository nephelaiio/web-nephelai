var  gulp = require('gulp'),
    rename = require('gulp-rename'),
    hb = require('gulp-hb'),
    hblayouts = require('handlebars-layout'),
    htmlhint = require('gulp-htmlhint'),
    del = require('del');

var defaults = {
    dist: {
        root: "./dist",
        js: "./dist/js",
        css: "./dist/css"
    }
};

gulp.task('css', function() {
    return gulp.src('./src/css/*.css')
        .pipe(gulp.dest(defaults.dist.css))
});

//TODO: check partials are correctly embedded within layouts
gulp.task('handlebars', function() {
    var hbStream = hb()
        .partials('./src/partials/*.hbs')
        .partials('./src/layouts/*.hbs')
        .helpers(hblayouts);
    return gulp.src('./src/views/*.hbs')
        .pipe(hbStream)
        .pipe(rename({
            extname: ""
        }))
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(gulp.dest(defaults.dist.root))
});

gulp.task('build', ['css', 'handlebars']);

gulp.task('lint', ['build'], function () {
    return gulp.src('./dist/**.html')
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter())
});

gulp.task('clean', function() {
    return del([
        './dist'
    ])
});

gulp.task('default', ['lint']);