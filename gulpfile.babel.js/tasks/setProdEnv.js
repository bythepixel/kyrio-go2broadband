import gulp from 'gulp'
import config from '../config'

gulp.task('setProdEnv', function() {
    return process.env.NODE_ENV = config.env = 'production';
});
