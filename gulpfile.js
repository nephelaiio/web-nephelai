var gulp = require('gulp'),
    install = require('gulp-install'),
    rename = require('gulp-rename'),
    hb = require('gulp-hb'),
    hblayouts = require('handlebars-layout'),
    htmlhint = require('gulp-htmlhint'),
    del = require('del'),
    sass = require('gulp-sass'),
    gnf = require('gulp-npm-files'),
    nightwatch = require('gulp-nightwatch'),
    connect = require('gulp-connect');

var hbStream = hb()
    .partials('./src/partials/*.hbs')
    .partials('./src/layouts/*.hbs')
    .helpers(hblayouts)
    .data('./src/data/*.json');

var defaults = {
    dist: {
        root: "./dist",
        css: "./dist/css",
        assets: "./dist/assets"
    }
};

gulp.task('update', function () {
    return gulp.src('./package.json')
        .pipe(install())
});

gulp.task('modules', ['update'], function () {
    return gulp.src(gnf(), {base: './'})
        .pipe(gulp.dest(defaults.dist.assets))
});

gulp.task('assets', ['update'], function () {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest(defaults.dist.assets))
});

gulp.task('sass', ['modules'], function () {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass({
            includePaths: [
                './node_modules/bootstrap-sass/assets/stylesheets',
                './node_modules/support-for/sass',
                './node_modules/normalize-scss/sass',
                './node_modules/sass-web-fonts'
            ]
        }).on('error', sass.logError))
        .pipe(gulp.dest(defaults.dist.css))
});

gulp.task('handlebars', ['update'], function () {
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

gulp.task('build', ['modules', 'sass', 'assets', 'handlebars']);

gulp.task('lint', function () {
    return gulp.src('./dist/**.html')
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter())
});

gulp.task('clean', function () {
    return del([
        './dist'
    ])
});

gulp.task('test', function () {
    return gulp.src('')
        .pipe(nightwatch({
            configFile: 'test/nightwatch.json',
            cliArgs: {
                env: 'phantomJS'
            }
        }));
});

gulp.task('http', function () {
    connect.server({
        port: 8888,
        root: 'dist'
    });
});

gulp.task('default', ['lint', 'test']);