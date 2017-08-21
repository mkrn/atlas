'use strict'

import gulp from 'gulp'
import runSequence from 'run-sequence'
import gulpLoadPlugins from 'gulp-load-plugins'
import { spawn } from "child_process";

const $ = gulpLoadPlugins()
const browserSync = require('browser-sync').create()
const isProduction = process.env.NODE_ENV === 'production'

const onError = (err) => {
    console.log(err)
}

// --

gulp.task('server', ['build'], () => {
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    })
    gulp.watch(['src/sass/**/*.scss'], ['sass'])
    gulp.watch(['src/js/**/*.js'], ['js-watch'])
    gulp.watch(['archetypes/**/*', 'data/**/*', 'content/**/*', 'layouts/**/*', 'static/**/*'], ['hugo'])
});

gulp.task('build', () => {
    runSequence(['sass', 'js', 'fonts', 'images'], 'hugo')
})

gulp.task('build-preview', () => {
    runSequence(['sass', 'js', 'fonts', 'images'], 'hugo-preview')
})

gulp.task('hugo', (cb) => {
    return spawn('hugo', { stdio: 'inherit' }).on('close', (code) => {
        browserSync.reload()
        cb()
    })
})

gulp.task('hugo-preview', (cb) => {
    return spawn('hugo', ['--buildDrafts', '--buildFuture'], { stdio: 'inherit' }).on('close', (code) => {
        browserSync.reload()
        cb()
    })
})

// --

gulp.task('sass', () => {
    return gulp.src([
        'src/sass/app.scss'
    ])
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.newer('static/css/app.css'))
    .pipe($.print())
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.sass({ precision: 5 }))
    .pipe($.autoprefixer(['ie >= 10', 'last 2 versions']))
    .pipe($.if(isProduction, $.cssnano({ discardUnused: false, minifyFontValues: false })))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest('static/css'))
    .pipe(browserSync.stream())
})

gulp.task('js-watch', ['js'], (cb) => {
    browserSync.reload();
    cb();
});

gulp.task('js', () => {
    return gulp.src([
        'src/js/app.js'
    ])
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.newer('static/js/app.js'))
    .pipe($.print())
    .pipe($.babel())
    .pipe($.concat('app.js'))
    .pipe($.if(isProduction, $.uglify()))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest('static/js'))
})

gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/*.{woff,woff2}')
        .pipe(gulp.dest('static/fonts'));
});

gulp.task('images', () => {
    return gulp.src('src/images/**/*.{png,jpg,jpeg,gif,svg,webp}')
        .pipe($.newer('static/images'))
        .pipe($.print())
        .pipe($.imagemin())
        .pipe(gulp.dest('static/images'));
});
