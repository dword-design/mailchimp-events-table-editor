var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var mainBowerFiles = require('main-bower-files');
var wiredep = require('wiredep');
var concat = require('gulp-concat');

var scssPath = 'scss/**/*.scss';

gulp.task('sass', function () {

    return gulp.src(scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError)) //error log to keep session going when scss contains error
        // .pipe(sourcemaps.write())
        .pipe(autoprefixer({ remove: false, browsers: ['last 2 versions','IE 8','IE 7','iOS 7','Firefox < 20'] }))
        .pipe(gulp.dest('web/css'));
});

gulp.task('js', function () {
    var jsPaths = mainBowerFiles({ filter: '**/*.js' }).concat([ 'js/**/*.js' ]);

    return gulp.src(jsPaths)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('web/js'));
});

// ### Wiredep
// `gulp wiredep` - Automatically inject Less and Sass Bower dependencies. See
// https://github.com/taptapship/wiredep
gulp.task('wiredep', function() {

    wiredep({ src: ['web/index.html', 'scss/style.scss'] });
});

gulp.task('compile', ['wiredep', 'sass', 'js']);

gulp.task('watch', function() {
    gulp.watch(scssPath, ['compile'])
});
