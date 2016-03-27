var gulp = require('gulp'),
    rename = require('gulp-rename'),
    hb = require('gulp-hb'),
    hblayouts = require('handlebars-layout'),
    htmlhint = require('gulp-htmlhint'),
    del = require('del');

var hbStream = hb()
    .partials('./src/partials/*.hbs')
    .partials('./src/layouts/*.hbs')
    .helpers(hblayouts)
    .data('./src/data/*.json');

var defaults = {
    dist: {
        root: "./dist",
        assets: "./dist/assets",
    }
};

gulp.task('assets', function () {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest(defaults.dist.assets))
});

gulp.task('handlebars', function () {
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

gulp.task('build', ['assets', 'handlebars']);

gulp.task('lint', ['build'], function () {
    return gulp.src('./dist/**.html')
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter())
});

gulp.task('clean', function () {
    return del([
        './dist'
    ])
});

gulp.task('default', ['lint']);
