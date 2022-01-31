//для новой установки всей из pacage json  в консоле набираем npm i

function gulp3 (){
	let syntax        = 'sass'; // Syntax: sass or scss;
	let directory 		= 'app';
	let gulp = require('gulp'),
		gutil = require('gulp-util'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		cleancss = require('gulp-clean-css'),
		rename = require('gulp-rename'),
		autoprefixer = require('gulp-autoprefixer'),
		notify = require("gulp-notify"),
		rsync = require('gulp-rsync');

	gulp.task('browser-sync', function () { // Создаем таск browser-sync
		browserSync({ // Выполняем browser Sync
			server: { // Определяем параметры сервера
				baseDir: directory // Директория для сервера - app
			},
			notify: false // Отключаем уведомления
		});
	});

	gulp.task('styles', function () {
		return gulp.src(directory + "/" + syntax + '/**/*.' + syntax + '')
			.pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
			//.pipe(rename({ suffix: '.min', prefix : '' }))
			.pipe(autoprefixer(['last 15 versions']))
			//.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
			.pipe(gulp.dest(directory + "/" + 'css'))
			.pipe(browserSync.reload({stream: true}))
	});

	gulp.task('html', function () {
		return gulp.src(directory + "/" + '*.html')
			.pipe(gulp.dest(directory + "/"))
			.pipe(browserSync.reload({stream: true}))
	});

	gulp.task('js', function () {
		return gulp.src([
			directory + '/libs/jquery/dist/jquery.min.js',
			//directory + '/libs/jquery-ui/jquery-ui.min.js',
			directory + '/libs/bootstrap/js/bootstrap.min.js',
			//directory + '/libs/parallax/parallax.min.js',
			//directory + '/libs/maskedinput/jquery.maskedinput.js',
			//directory + '/libs/lazyimages/jquery.lazy.min.js',
			//directory + '/libs/fullpage/fullpage.extensions.min.js',
			directory + '/libs/jcarousel/jquery.jcarousel.min.js',
			//directory + '/libs/bxslider-4-master/jquery.bxslider.min.js',
			//directory + '/libs/chosen/chosen.jquery.min.js',
			//directory + '/libs/chosen/chosen.proto.min.js',
			directory + '/libs/mag-popup/jquery.magnific-popup.min.js',
			directory + '/libs/jquery-swipe/jquery.touch.js',
			directory + '/libs/jquery-swipe/jquery.swipe.js',
			//directory + '/libs/customScrollbarPlugin/jquery.mCustomScrollbar.concat.min.js',
			directory + '/js/common.js', // Always at the end
		])
			.pipe(concat('scripts.js'))
			//.pipe(uglify()) // Mifify js (opt.)
			.pipe(gulp.dest(directory + "/" + 'js'))
			.pipe(browserSync.reload({stream: true}))
	});

	gulp.task('rsync', function () {
		return gulp.src(directory + '/**')
			.pipe(rsync({
				root: directory + "/",
				hostname: 'username@yousite.com',
				destination: 'yousite/public_html/',
				// include: ['*.htaccess'], // Includes files to deploy
				exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
				recursive: true,
				archive: true,
				silent: false,
				compress: true
			}))
	});

	gulp.task('watch', ['styles', 'js', 'browser-sync'], function () {
		gulp.watch('app/*.html', browserSync.reload);
		gulp.watch(directory + "/" + syntax + '/**/*.' + syntax + '', ['styles']);
		gulp.watch([directory + "/" + 'libs/**/*.js', directory + "/" + 'js/common.js'], ['js'])
	});

	gulp.task('default', ['watch']);
}


let syntax        = 'sass'; // Syntax: sass or scss;
let projectName = 'splav';
let directory 		= 'app';
// Определяем константы Gulp
const { src, dest, parallel, series, watch } = require('gulp');
// Подключаем Browsersync
const browserSync = require('browser-sync').create();
// Подключаем gulp-concat
const concat = require('gulp-concat');
const rename = require('gulp-rename');
// Подключаем gulp-uglify-es
const uglify = require('gulp-uglify-es').default;
// Подключаем модули gulp-sass и gulp-less
const sass = require('gulp-dart-sass');
const less = require('gulp-less');
// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');
// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');

function styles() {
	setTimeout(()=>{}, 100)
		return src(directory + "/" + syntax + '/**/*.' + syntax + '')
			.pipe(eval(syntax)())
			.pipe(rename({ suffix: '.min', prefix : '' }))
			.pipe(autoprefixer({ }))
			.pipe(cleancss( { } )) // Opt., comment out when debugging
			.pipe(dest(directory + "/" + 'css'))
			.pipe(browserSync.stream())

}

function browserSyncInit() {
	browserSync.init({ // Инициализация Browsersync

		//proxy: 'localhost/' + projectName + '/' + directory, //только для php проекта
		//port: 8080, //только для php проекта

		server: { baseDir: 'app/' }, // Указываем папку сервера (только для html проекта)

		notify: false, // Отключаем уведомления
		online: true // Режим работы: true или false
	})
}

function scripts() {
	setTimeout(()=>{}, 100)
		return src([ // Берём файлы из источников
			directory + "/" + 'libs/jquery/dist/jquery.min.js',
			directory + "/" + 'libs/jquery-ui/jquery-ui.min.js',
			directory + "/" + 'libs/bootstrap/js/bootstrap.min.js',
			directory + "/" + 'libs/parallax/parallax.min.js',
			directory + "/" + 'libs/maskedinput/jquery.maskedinput.js',
			directory + "/" + 'libs/fullpage/fullpage.extensions.min.js',
			directory + "/" + 'libs/jcarousel/jquery.jcarousel.min.js',
			directory + "/" + 'libs/chosen/chosen.jquery.min.js',
			directory + "/" + 'libs/chosen/chosen.proto.min.js',
			directory + "/" + 'libs/mag-popup/jquery.magnific-popup.min.js',
			directory + "/" + 'libs/jquery-swipe/jquery.swipe.js',
			directory + "/" + 'libs/customScrollbarPlugin/jquery.mCustomScrollbar.concat.min.js',
			directory + "/" + 'libs/adjoo-fullpagescroll/adjoo-fps.js',
			directory + "/" + 'js/common.js', // Always at the end
			//directory + "/" + 'js/page_*.js',
		], {allowEmpty: true})
			.pipe(concat('scripts.min.js')) // Конкатенируем в один файл
			//.pipe(uglify()) // Сжимаем JavaScript
			.pipe(dest('app/js/')) // Выгружаем готовый файл в папку назначения
			.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

function startwatch() {
	// Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
	watch([directory + '/**/*.js', '!' + directory + '/**/*.min.js'],{usePolling: true}, scripts);
	// Мониторим файлы препроцессора на изменения
	watch(directory + '/**/' + syntax + '/**/*',{usePolling: true}, styles);
	// Мониторим файлы HTML на изменения
	watch(directory + '/**/*.html').on('change', browserSync.reload, {usePolling: true});
	// Мониторим файлы PHP на изменения
	watch(directory + '/**/*.php').on('change', browserSync.reload, {usePolling: true});
}

exports.styles = styles;
exports.scripts = scripts;
exports.browserSyncInit = browserSyncInit;
// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(scripts, styles, browserSyncInit, startwatch);
