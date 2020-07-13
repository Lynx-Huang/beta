var gulp = require('gulp');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var rename = require("gulp-rename");
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var folders = require('gulp-folders-4x');
var pathToFolder = 'src/javascripts';
var replace = require('gulp-string-replace');
var path = require('path');
var htmlreplace = require('gulp-html-replace');
var minifyHTML = require('gulp-minify-html');
var htmlbeautify = require('gulp-html-beautify');
var image = require('gulp-image');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var extender = require('gulp-html-extend');
var livereload = require('gulp-livereload');
//var connectphp = require('gulp-connect-php');
var changed = require('gulp-changed');
//===========================================
var cssImgPath = "../img/"; // css輸出後的的圖片路徑
var assetspath = "../../../../assets/"; // php輸出後的的路徑，..層級請自己加
var htmlfolder = "en"; // src裡面的預設html資料夾
var tempfolder = "src/html-output/en"; //預覽資料夾
// var destfolder = "application/views/en"; 
// 輸出php的預設資料夾，注意!!此資料夾的層級要與html-output的資料夾同級 //application/views/en
var jsplugin = {
    'css': assetspath + 'css/style.min.css',
    'js-control': assetspath + 'js/9-controller.min.js',
    'js': assetspath + 'js/main.min.js',
    'oldie': assetspath + 'js/html5shiv.min.js',
    'js-slick': assetspath + 'js/slick.min.js',
    'js-photoswipe': assetspath + 'js/photoswipe.min.js',
    'js-daterangepicker': assetspath + 'js/daterangepicker.min.js',
    'js-lity': assetspath + 'js/lity.min.js',
    'js-swiper': assetspath + 'js/swiper.min.js',
    'js-scrollr': assetspath + 'js/scrollr.min.js',
    'js-mousewheel': assetspath + 'js/mousewheel.min.js',
    'js-overlayscrollbars': assetspath + 'js/overlayscrollbars.min.js',
};

//var pathToFolder = 'assets/admin/js/origin';
//===========================================

// 清除，尚未啟用
// gulp.task('default', ['clean'], function() {
//     gulp.start('scripts', 'styles', 'imagesmin');
// });

// 開啟http server
gulp.task('server', function(cb) {
    connect.server({
        livereload: true,
        port: 8080
    });
    cb();
});


// 監聽scss
gulp.task('sass', function(cb) {
    gulp.src('src/scss/*.scss')
        .pipe(plumber())
        .pipe(
            sass({ outputStyle: "compressed" }) // compressed / nested
            .on("error", sass.logError)
        )
        .pipe(replace('../../src/images/', cssImgPath))
        .pipe(replace('../../images/', cssImgPath))
        .pipe(replace('../images/', cssImgPath))
        .pipe(replace('src/', 'assets/'))
        .pipe(uglifycss())
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".css";
        }))
        .pipe(gulp.dest('assets/css'));
        cb();
});

// 將css壓縮並更名
// gulp.task('styles', function() {
//     return gulp.src('src/css/*.css')
//         .pipe(replace('../../src/images/', cssImgPath))
//         .pipe(replace('../../images/', cssImgPath))
//         .pipe(replace('../images/', cssImgPath))
//         .pipe(replace('src/', 'assets/'))
//         .pipe(uglifycss())
//         .pipe(rename(function(path) {
//             path.basename += ".min";
//             path.extname = ".css";
//         }))
//         .pipe(gulp.dest('assets/css'));
// });


// 將js壓縮並更名
gulp.task('js-folder-min', folders(pathToFolder, function(folder) {
    return gulp.src(path.join(pathToFolder, folder, '*.js'))
        .pipe(concat(folder + '.js'))
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('assets/js'));
    })
);

// gulp.task('js-folder-min', (cb) => {
//     return gulp
//         .src('src/javascripts/main/9-controller.js')
//         .pipe(uglify())
//         .pipe(rename(function(path) {
//             path.basename += ".min";
//             path.extname = ".js";
//         }))
//         .pipe(gulp.dest('assets/js'));
//         cb();
// });

// 壓縮圖片 
gulp.task('image', function(cb) {
    var DEST = 'assets/img'
    gulp.src('src/images/**/*')
        .pipe(changed(DEST))
        .pipe(image({
            zopflipng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: false,
            concurrent: 5
        }))
        .pipe(gulp.dest(DEST));
        cb();
});

// 程式壓縮
// gulp.task('adminjs', function() {
//     return gulp.src('assets/admin/js/origin/*.js')
//         .pipe(concat('all.js'))
//         .pipe(uglify())
//         .pipe(rename(function(path) {
//             path.basename += ".min";
//             path.extname = ".js";
//         }))
//         .pipe(gulp.dest('assets/admin/js'));
// });

// 置換共用css與js區塊
// gulp.task('php-replace', function() {
//     var opts = { comments: true, spare: true, quotes: true };
//     return gulp.src('src/' + htmlfolder + '/**/*.html')
//         .pipe(extender({ annotations: true, verbose: false }))
//         .pipe(replace('../../images/', assetspath + 'img/'))
//         .pipe(replace('../images/', assetspath + 'img/'))
//         .pipe(replace('.html\"', '.php\"'))
//         .pipe(replace('../../javascripts/', assetspath + 'js/'))
//         .pipe(replace('../javascripts/', assetspath + 'js/'))
//         .pipe(replace('.css"', '.min.css"'))
//         .pipe(replace('.js"', '.min.js"'))
//         .pipe(htmlreplace(jsplugin))
//         .pipe(minifyHTML(opts))
//         .pipe(htmlbeautify({ indentSize: 4 }))
//         .pipe(rename({
//             //dirname: "main/text/ciao",
//             //basename: "aloha",
//             prefix: "_",
//             //suffix: "-hola",
//             extname: ".php"
//         }))
//         .pipe(gulp.dest(destfolder));

// });


// 置換共用css與js區塊
gulp.task('html-output', function(cb) {
    return gulp.src('src/' + htmlfolder + '/**/*.html')
        .pipe(extender({ annotations: true, verbose: false }))
        .pipe(replace('../../images/', assetspath + 'img/'))
        .pipe(replace('../images/', assetspath + 'img/'))
        .pipe(replace('../../javascripts/', assetspath + 'js/'))
        .pipe(replace('../javascripts/', assetspath + 'js/'))
        .pipe(replace('.css"', '.min.css"'))
        .pipe(replace('.js"', '.min.js"'))
        .pipe(htmlreplace(jsplugin))
        .pipe(gulp.dest(tempfolder))
        .pipe(connect.reload());
        cb()
});

// gulp.task('build', ['fonts', 'compass', 'styles', 'js-folder-min', 'image', 'html-output']);
// 'php-replace',
gulp.task('watch-html', function(cb) {
    gulp.watch('src/scss/**/*.*', gulp.parallel('sass'));
    gulp.watch('src/' + htmlfolder + '/**/*.html',  gulp.parallel('html-output'));
    // gulp.watch('src/' + htmlfolder + '/**/*.html', ['php-replace']);
    // gulp.watch('src/css/*.css', ['styles']);
    gulp.watch('src/images/**/*',  gulp.parallel('image'));
    gulp.watch('src/javascripts/**/*.js', gulp.parallel('js-folder-min'));
    livereload.listen();
    gulp.watch([tempfolder + '/**/*.*']).on('change', livereload.changed);
    gulp.watch(['assets/**/*.*']).on('change', livereload.changed);
    cb();
});
gulp.task('init', gulp.series('image', 'sass', 'js-folder-min'));
gulp.task('live', gulp.series('server', 'watch-html'));