var fs   = require('fs');
var path = require('path');

var gulp    = require('gulp');
var gcson   = require('gulp-cson');
var clean   = require('gulp-clean');
var rename  = require('gulp-rename');
var merge   = require('merge2');
var concat  = require('gulp-concat');
var insert  = require('gulp-insert');
var combine = require('gulp-jsoncombine');

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

// Clean up
gulp.task('clean', function (done) {
  return gulp.src('build/*', {read: false})
    .pipe(clean());
});

// Compile JSON files
gulp.task('compile', ['clean'], function (done) {
  return gulp.src('./data/**/*.cson')
    .pipe(gcson())
    .pipe(rename({extname: '.json'}))
    .pipe(gulp.dest('./build/'));
});

// Build merged JSON files
gulp.task('build-individual', ['compile'], function (done) {
  return merge(getFolders('./build').map(function (folder) {
    return gulp.src(path.join('./build', folder, '/**/*.json'))
      .pipe(combine(folder + '.json', function (data) {
        var combined = {};
        for (var key in data) {
          combined[key] = data[key];
        }
        return new Buffer(JSON.stringify(combined));
      }))
      .pipe(gulp.dest('./build'));
  }));
});

// Build single master json file
gulp.task('build-master', ['build-individual'], function (done) {
  return gulp.src('./build/*.json')
    .pipe(combine('pathminder.json', function (data) {
      var combined = {};
      for (var key in data) {
        combined[key] = data[key];
      }
      return new Buffer(JSON.stringify(combined));
    }))
    .pipe(gulp.dest('./build'));
});
