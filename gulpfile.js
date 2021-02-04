const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ lazy: true });
const fs = require('fs');
const closureCompiler = require('google-closure-compiler').gulp({
  extraArguments: ['-Xms2048m']
});

const paths = {
  scripts: [
    'node_modules/google-closure-library/closure/goog/**/*.js',
    'node_modules/google-closure-library/third_party/**/*.js',
    'node_modules/closure-templates/soyutils_usegoog.js',
    'src/js/app/soy/.cache/**/*.soy.js',
    'src/js/app/**/!(*.spec)+(.js)'
  ]
};

gulp.task('lint', () => {
    return gulp.src(['./src/app/**/*.js','!node_modules/**', '!./src/app/soy**/*.js'])
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError());
});

gulp.task('watch', () => {
  gulp.watch([
    'src/js/app/**/*.js',
    'src/js/app/**/*.soy',
    '!src/js/app/soy/**/*.js',
    '!src/js/app/soy/**/*.soy',
    './src/scss/**/*.scss'
  ], gulp.series('generate-closure-deps', 'generate-soy-template', 'sass'));
});

gulp.task('generate-soy-template', () => {
  return gulp.src(['src/js/app/**/*.soy'])
    .pipe($.soynode({
      outputDir: '.cache',
      uniqueDir: true,
      loadCompiledTemplates: false,
      useClosureStyle: false
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

gulp.task('generate-closure-deps-test', () => {

  return gulp.src(paths.scripts)
    .pipe($.closureDeps({
      fileName: 'deps.test.js',
      prefix: '../../../../',
      baseDir: './'
    }))
    .pipe(gulp.dest('src/js'));
});

gulp.task('build-js', () => {
  return gulp.src(paths.scripts, {base: './'})
      .pipe(closureCompiler({
        closure_entry_point: 'app.Application',
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        warning_level: 'VERBOSE',
        define: [
          "goog.DEBUG=false"
        ],
        only_closure_dependencies: true,
        output_wrapper: '(function(){%output%})();',
        js_output_file: 'app.min.js'
        }))
      .pipe(gulp.dest('./dist/js'));
});

gulp.task('build-scripts', gulp.series('generate-closure-deps', 'generate-soy-template', 'build-js'));


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

gulp.task('build-css', gulp.series('sass'), () => {

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

gulp.task('test-runner', (done) => {
  testRunner(true, done);
});

gulp.task('test-runner-watch', (done) => {
  testRunner(false, done);
});

gulp.task('test', gulp.series('generate-closure-deps-test', 'test-runner'));

gulp.task('test-watch', gulp.series('generate-closure-deps-test', 'test-runner-watch'));

function testRunner(isSingleRun, done) {
  const Server = require('karma').Server;

  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: isSingleRun
  }, karmaCompleted).start();

  function karmaCompleted(karmaResult) {

    if (karmaResult === 1) {
      done('karam: test failed with code ' + karmaResult);
    } else {
      done();
    }
  }
}

gulp.task('build', gulp.series('build-css', 'build-scripts'));
gulp.task('dev', gulp.series('generate-closure-deps', 'generate-soy-template', 'sass', 'watch'));