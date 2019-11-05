'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    rigger = require('gulp-rigger'),
    prefixer = require('gulp-autoprefixer'),
    browserSync = require("browser-sync"),
    sourcemaps = require('gulp-sourcemaps');

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        libJS: 'build/js/vendor/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        sprite: 'build/img/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        libJS: 'src/js/vendor/*.js',
        style: 'src/styles/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/styles/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "test"
};

gulp.task('webserver', ['style:build'], function () {
    browserSync(config);
    gulp.watch([path.watch.style], ['style:build']);
});


gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});


gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('libJs:build', function () {
    gulp.src(path.src.libJS)
        .pipe(gulp.dest(path.build.libJS));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer({
            browsers: [
                'ie >= 10',
                'ie_mob >= 10',
                'ff >= 30',
                'chrome >= 34',
                'safari >= 7',
                'opera >= 23',
                'ios >= 6',
                'android >= 4.4',
                'bb >= 10'
            ],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


gulp.task('build', [
    'html:build',
    'js:build',
    'libJs:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function () {
    gulp.watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    gulp.watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
    gulp.watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    gulp.watch([path.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
    gulp.watch([path.watch.fonts], function (event, cb) {
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);