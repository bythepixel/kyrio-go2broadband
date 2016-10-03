import gulp from 'gulp'
import config from '../config'
import browserSync from 'browser-sync'

const sync = () => {
    browserSync.init(config.tasks.browserSync);
}

gulp.task('browserSync', sync)

export default sync
