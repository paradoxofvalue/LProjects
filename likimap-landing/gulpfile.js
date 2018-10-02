'use strict';

const path = require('path');
const del = require('del');
const gulp = require('gulp');
const gulplog = require('gulplog');
const combine = require('stream-combiner2').obj;
const throttle = require('lodash.throttle');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const AssetsPlugin = require('assets-webpack-plugin');
const webpack = require('webpack');
const notifier = require('node-notifier');
const sass = require('gulp-sass');

const fileinclude = require('gulp-file-include');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles-sass', () => {
  return gulp.src('frontend/styles/index.scss')
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'Styles-sass',
        message: err.message
      }))
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulpIf(!isDevelopment, combine(cssnano(), rev())))
    .pipe(gulp.dest('public/styles/'))
    .pipe(gulpIf(!isDevelopment, combine(rev.manifest('css.json'), gulp.dest('manifest'))));
})

gulp.task('assets', function () {
  return gulp.src('frontend/assets/**/*.*', { since: gulp.lastRun('assets') })
    .pipe(gulpIf(!isDevelopment, revReplace({
      manifest: gulp.src('manifest/css.json', { allowEmpty: true })
    })))
    .pipe(gulpIf(!isDevelopment, revReplace({
      manifest: gulp.src('manifest/webpack.json', { allowEmpty: true })
    })))
    .pipe(gulp.dest('public'));
});

gulp.task('images', function () {
  return gulp.src('frontend/assets/images/**/*.{svg,png,jpg}', { since: gulp.lastRun('images') })
    .pipe(gulp.dest('public/images'));
});

gulp.task('webpack', function (callback) {

  let options = {
    entry: {
      script: './frontend/js/script',
      mainPage: './frontend/js/mainPage',
      // pageIndex: './frontend/js/page-index'
    },
    output: {
      path: __dirname + '/public/js',
      publicPath: '/js/',
      filename: isDevelopment ? '[name].js' : '[name]-[chunkhash:10].js'
    },
    watch: isDevelopment,
    devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
    module: {
      loaders: [{
        test: /\.js$/,
        include: path.join(__dirname, "frontend"),
        loader: 'babel?presets[]=es2015'
      }]
    },
    plugins: [
      new webpack.NoErrorsPlugin() // otherwise error still gives a file
    ]
  };

  if (!isDevelopment) {
    options.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // don't show unreachable variables etc
          warnings: false,
          unsafe: true
        }
      }),
      new AssetsPlugin({
        filename: 'webpack.json',
        path: __dirname + '/manifest',
        processOutput(assets) {
          for (let key in assets) {
            assets[key + '.js'] = assets[key].js.slice(options.output.publicPath.length);
            delete assets[key];
          }
          return JSON.stringify(assets);
        }
      })
    );

  }

  // https://webpack.github.io/docs/node.js-api.html
  webpack(options, function (err, stats) {
    if (!err) { // no hard error
      // try to get a soft error from stats
      err = stats.toJson().errors[0];
    }

    if (err) {
      notifier.notify({
        title: 'Webpack',
        message: err
      });

      gulplog.error(err);
    } else {
      gulplog.info(stats.toString({
        colors: true
      }));
    }

    // task never errs in watch mode, it waits and recompiles
    if (!options.watch && err) {
      callback(err);
    } else {
      callback();
    }

  });


});

gulp.task('clean', function () {
  return del(['public', 'manifest']);
});

gulp.task('fileinclude', function () {
  return gulp.src(['./frontend/assets/**/*.{svg,html}'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
    }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('images', 'styles-sass', 'webpack', ), 'assets', 'fileinclude',));

gulp.task('serve', function () {
  browserSync.init({
    server: 'public'
  });

  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});



gulp.task('dev',
  gulp.series(
    'build',
    gulp.parallel(
      'serve',
      function () {
        gulp.watch('frontend/styles/**/*.scss', gulp.series('styles-sass'));
        gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
        gulp.watch('frontend/assets/images/**/*.{svg,png,jpg}', gulp.series('images'));
        gulp.watch('frontend/assets/**/*.html', gulp.series('fileinclude'));
      }
    )
  )
);
