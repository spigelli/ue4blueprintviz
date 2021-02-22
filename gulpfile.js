var gulp = require('gulp');
var typescript = require('typescript')
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');

//var Server = require('karma').Server;

var dest = 'dest/';

gulp.task('minifyjs', function() {
    var options = {
        mangle: true
    };

    return gulp.src('dest/ue4blueprintviz.js')
        .pipe(uglify(options))
        .pipe(gulp.dest('dest'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/**/*.ts', ['compile']);
    gulp.watch('index.html', ['copy']);
});

// gulp.task('compile', function(){
//     var options = {
//         target: 'ES5',
//         out: 'ue4lib.js'
//     };

//     gulp.src(['src/Main.ts'])
//         .pipe(ts(options))
//         .pipe(gulp.dest(dest));
// });

gulp.task('compile', ()=>{
    return gulp.src('src/Main.ts')
        .pipe(ts({
            target: 'ES5',
            out: 'ue4lib.js'
        }))
        .pipe(gulp.dest(dest));
})

gulp.task('copy', function(){
    gulp.src('index.html')
        .pipe(gulp.dest(dest));
});

//gulp.task('test', function (done) {
//    new Server({
//        configFile: __dirname + '/karma.conf.js',
//        singleRun: true
//    }, done).start();
//});

//gulp.task('default', function(){
//    ['scripts', 'watch']
//    });
gulp.task('default', gulp.parallel('compile', 'watch'));
//gulp.task('production', ['compile', 'copy']);
//gulp.task('minify', ['minifyjs']);
//todo gulp.task('release',...)
