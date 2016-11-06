import gulp from 'gulp'
import compileSass from './compileSass'
import compileJs from './compileJs'
import compileTemplates from './compileTemplates'
import browserSync from 'browser-sync'
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

// Create the templateTask
const templateTask = () => {
    compileTemplates(config.tasks.templates.src + '/pages/**/*.+(html|nunjucks)', config.tasks.templates.dest)
}

// Create the watch task from both sass and js tasks
const watchTask = () => {
    gulp.watch(config.tasks.sass.src + '/**/*.scss', sassTask)
    gulp.watch(config.tasks.js.src + '/**/*.js', jsTask)
    gulp.watch(config.tasks.templates.src + '/**/*.+(html|nunjucks)', templateTask)
    gulp.watch(config.routes.src + '/**/*.+(js|html|nunjucks)').on('change', () => {
        setTimeout(browserSync.reload, 300)
    })
}

// Run the watch task
gulp.task('watch', ['setDevEnv', 'compileSass', 'compileJs', 'compileTemplates', 'browserSync'], () => {
    watchTask()
})

export default watchTask
