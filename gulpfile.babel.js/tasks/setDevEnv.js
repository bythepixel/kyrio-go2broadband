import gulp from 'gulp'
import config from '../config'

gulp.task('setDevEnv', function() {
    return process.env.NODE_ENV = config.env = 'development';
});
