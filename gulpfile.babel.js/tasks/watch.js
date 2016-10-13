import gulp from 'gulp'
import compileSass from './compileSass'
import compileJs from './compileJs'
import config from '../config'

// Create the sassTask
const sassTask = () => {
    compileSass(config.tasks.sass.src + '/app.scss', config.tasks.sass.dest)
    compileSass(config.tasks.sass.src + '/ie.scss', config.tasks.sass.dest)
}

// Create the jsTask
const jsTask = () => {
    compileJs(config.tasks.js.src + '/app.js', config.tasks.js.dest)
}

// Create the watch task from both sass and js tasks
const watchTask = () => {
    gulp.watch(config.tasks.sass.src + '/**/*.scss', sassTask)
    gulp.watch(config.tasks.js.src + '/**/*.js', jsTask)
}

// Run the watch task
gulp.task('watch', ['setDevEnv', 'compileSass', 'compileJs', 'browserSync'], () => {
    watchTask()
})

export default watchTask
