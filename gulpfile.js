const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ lazy: true });
const fs = require('fs');


gulp.task('default', ['help']);
gulp.task('dev', ['generate-closure-deps', 'generate-soy-template', 'sass', 'watch']);
gulp.task('build', ['build-css', 'build-scripts']);
gulp.task('help', $.taskListing);

const paths = {
  scripts: [
    'node_modules/google-closure-library/closure/goog/**/*.js',
    'node_modules/google-closure-library/third_party/**/*.js',
    'node_modules/closure-templates/soyutils_usegoog.js',
    'src/js/app/**/*.js',
    'src/js/app/soy/.cache/**/*.soy.js'
  ]
};

gulp.task('watch', () => {
  gulp.watch([
    'src/js/app/**/*.js',
    'src/js/app/**/*.soy',
    '!src/js/app/soy/**/*.js',
    '!src/js/app/soy/**/*.soy',
    './src/scss/**/*.scss'
  ], ['generate-closure-deps', 'generate-soy-template', 'sass']);
});

gulp.task('generate-soy-template', () => {
  return gulp.src(['src/js/app/**/*.soy'])
    .pipe($.soynode({
      outputDir: '.cache',
      uniqueDir: true,
      loadCompiledTemplates: false,
      useClosureStyle: true
    }))
    .pipe(gulp.dest('./src/js/app/soy/.cache/'));
});

gulp.task('generate-closure-deps', () => {

  return gulp.src(paths.scripts)
    .pipe($.closureDeps({
      fileName: 'deps.js',
      prefix: '../../../../',
      baseDir: './'
    }))
    .pipe(gulp.dest('src/js'));
});

gulp.task('build-scripts', ['generate-closure-deps', 'generate-soy-template'],  () => {
  return gulp.src(paths.scripts)
    .pipe($.closureCompiler({
      compilerPath: resolveComplilerFile(),
      fileName: 'app.js',
      compilerFlags: {
        closure_entry_point: 'app.Application',
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        define: [
          "goog.DEBUG=false"
        ],
        only_closure_dependencies: true,
        output_wrapper: '(function(){%output%})();'
      }
    }))
    .pipe(gulp.dest('dist/js/'));
});


gulp.task('sass', () => {

  return gulp.src('./src/scss/**/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./src/css'));
});

gulp.task('build-css', ['sass'], function () {

  return gulp.src([
    './src/css/*.css'
  ])
    .pipe($.csso())
    .pipe($.concat('app.min.css'))
    .pipe(gulp.dest('./dist/css/'));
});

function resolveComplilerFile() {
  const path = `${__dirname}/closure-compiler/`;
  const compilerFile = fs.readdirSync(`${__dirname}/closure-compiler/`).find((file) => file.match(/compiler/g));
  return `${path}${compilerFile}`;
}
