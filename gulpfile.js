var gulp = require('gulp');
var sftp = require('gulp-sftp');
 
gulp.task('upload', function () {
  return gulp.src('./dist/**/*')
    .pipe(sftp({
      host: '129.204.186.24',
      port: 22345,
      auth: 'FTPServer1',
      remotePath:'/../gin/vulog'
    }));
});