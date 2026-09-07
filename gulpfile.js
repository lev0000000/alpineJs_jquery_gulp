var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass')(require('sass')), //Подключаем Sass пакет,
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    merge = require('merge-stream')

gulp.task('del', function (){
    return deleteAsync(['dist']);
})

gulp.task('sass', function () {
    return gulp.src('app/sass/main.sass')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
})

gulp.task('watch', function () {
    gulp.watch('app/sass/**/*.sass', gulp.series('sass'))
    
})

gulp.task('scripts', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        'app/libs/alpinejs/dist/cdn.min.js'
    ])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('app/js'))
})

gulp.task('build', gulp.series('sass', 'scripts', function () {

    var buildCss = gulp.src([ // Переносим CSS стили в продакшен
        'app/css/main.css',
    ])
        .pipe(gulp.dest('dist/css'))

    var buildJs = gulp.src('app/js/**/*.js') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

    return merge(buildCss, buildJs, buildHtml);
}));

// gulp.task('mytask', function() {s
//   console.log('Привет, я таск!');
// });