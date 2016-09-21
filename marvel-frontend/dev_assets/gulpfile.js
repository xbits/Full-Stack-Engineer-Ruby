
var gulp = require('gulp');
var gutil = require('gulp-util');
var marvelApi = require('./marvel_api');
gulp.task('default', function() {
  for (var obj of marvelApi.apis) {
    gutil.log(JSON.stringify(obj));
  }
})

