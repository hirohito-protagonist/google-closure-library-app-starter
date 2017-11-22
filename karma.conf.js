module.exports = function(config) {

  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: [
      'node_modules/google-closure-library/closure/goog/base.js',
      { pattern: 'node_modules/google-closure-library/closure/goog/**/*.js', included: false, served: true, watched: false },
      { pattern: 'node_modules/closure-templates/soyutils_usegoog.js', included: false, served: true, watched: false },
      { pattern: 'src/js/app/soy/.cache/**/*.js', included: false, served: true, watched: false },
      { pattern: 'src/js/app/**/!(*.spec)+(.js)', included: false, served: true, watched: false },
      'src/js/deps.test.js',
      'src/js/app/**/*.spec.js'
    ],
    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-jasmine-html-reporter',
      'karma-chrome-launcher'
    ],
    client: {
      clearContext: false
    },
    preprocessors: {
      './src/js/app/**/!(*.spec|*.soy)+(.js)': ['coverage']
    },
    reporters: ['dots', 'kjhtml', 'coverage'],
    coverageReporter: {
        dir: './tests/report/',
        reporters: [
          { type: 'html', subdir: 'report-html' },
          { type: 'lcov', subdir: 'report-lcov' },
          { type: 'text' },
          { type: 'text-summary' }
        ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
