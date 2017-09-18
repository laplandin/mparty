'use strict';

var  gulp = require('gulp');
var  watch = require('gulp-watch');
var  prefixer = require('gulp-autoprefixer');
var  uglify = require('gulp-uglify');
var  sourcemaps = require('gulp-sourcemaps');
var  cssmin = require('gulp-clean-css');
var  imagemin = require('gulp-imagemin');
var  pngquant = require('imagemin-pngquant');
var  browserSync = require("browser-sync");
// var  rigger = require('gulp-rigger');
var  reload = browserSync.reload;
var  rimraf = require('rimraf');
var  plumber = require('gulp-plumber');
var  sequence = require('gulp-sequence');
var  less = require('gulp-less');
var  concat = require('gulp-concat');
var handlebarsCompile = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var ttf2woff2 = require('gulp-ttf2woff2');
var ttf2woff = require('gulp-ttf2woff');

var wrap       = require('gulp-wrap');
var handlebars = require('gulp-handlebars');
var declare    = require('gulp-declare');
// var  ignore = require('gulp-ignore');

var path = {
    build: {
        //Адреса куда ложить файлы сборки
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        cssVendor:'build/css/vendor/',
        plugins: 'build/plugins/',
        files: 'build/download/'
    },
    src: {
        //Откуда брать исходники
        html: 'src/*.html',
        js: ['src/partials/components/**/*.js'],
        css: ['src/style/main.less', 'src/font-awesome-4.7.0/css/font-awesome.min.css'],
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        cssVendor: 'src/style/vendor/*.css',
        plugins: "src/plugins/**/*.*",
        files: "src/download/**/*.*"
    },
    watch: {
        //За изменениями каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        hbs: 'src/**/*.hbs',
        js: 'src/**/*.js',
        css: 'src/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        plugins: 'src/plugins/**/*.*',
        files: 'src/download/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    // tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Laplandin"
};

gulp.task('ttf2woff', function(){
    gulp.src(['./src/fonts/**/*.ttf'])
        .pipe(ttf2woff())
        .pipe(gulp.dest('./src/fonts'));
    gulp.src(['./src/fonts/**/*.ttf'])
        .pipe(ttf2woff2())
        .pipe(gulp.dest('./src/fonts'));
});

var repertoireData = require('./src/model/repertoire-items.json');

gulp.task('html:build', function() {
   return gulp.src('./src/*.hbs') //выбор фалов по нужному пути
        .pipe(handlebarsCompile({repertoire: repertoireData}, {
            ignorePartials: true,
            batch: ['./src/partials']
        }))
       .pipe(rename({
           extname: '.html'
       }))
        .pipe(gulp.dest(path.build.html)) //папка назначения
        .pipe(reload({stream:true})); //Перезагрузка сервера
});

var condition = '.src/plugins/**/*.js';
gulp.task('js:build', function() {
    return gulp.src(path.src.js)
    // .pipe(uglify()) //Сжимаем js
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream:true}));
});

gulp.task('css:build', function() {
    return gulp.src(path.src.css)
        .pipe(plumber())
        //.pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(cssmin({compatibility: 'ie10'}))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream:true}));
});

gulp.task('cssVendor', function() {
    return gulp.src(path.src.cssVendor)
        .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
    return gulp.src(path.src.img) //Выберем наши картинки
    // .pipe(imagemin({ //Сожмем их
    // progressive: true
    // svgoPlugins: [{removeViewBox: false}],
    // use: [pngquant()],
    // interlaced: true
    // }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('svg', function() {
   return gulp.src('src/img/svg/*.svg')
       .pipe(imagemin({
           svgoPlugins: [{removeViewBox: false}]
       }))
       .pipe(gulp.dest('src/img/'));
});

gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('plugins:copy', function() {
    return gulp.src(path.src.plugins)
        .pipe(gulp.dest(path.build.plugins))
        .pipe(reload({stream: true}));
});

gulp.task('files:copy', function() {
     return gulp.src(path.src.files)
        .pipe(gulp.dest(path.build.files))
        .pipe(reload({stream: true}));
});

gulp.task('precompile', function() {
    return gulp.src('./src/precompiled/*.html')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'App.templates',
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('build', sequence([
        'clean'
    ],
    [
        'html:build',
        'js:build',
        'css:build',
        'cssVendor',
        'fonts:build',
        'image:build',
        'plugins:copy',
        'precompile'
        // 'files:copy'
    ]) );

gulp.task('watch', function() {
    watch([path.watch.html, path.watch.hbs], function(event, cb) {
        gulp.start('html:build');
    });
    watch(['./src/model/*.*'], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.plugins], function(event, cb) {
        gulp.start('plugins:copy');
    });
    watch([path.watch.files], function(event, cb) {
        gulp.start('files:copy');
    });
});

gulp.task('webserver', function() {
    browserSync(config);
});

gulp.task('clean', function(cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', sequence(['build'], ['webserver'], 'watch') );
