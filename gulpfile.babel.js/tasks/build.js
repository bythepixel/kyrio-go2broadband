import gulp from 'gulp'
import compileSass from './compileSass'
import compileJs from './compileJs'
import compileTemplates from './compileTemplates'
import config from '../config'

// Create a unified task for compiling sass and js
const task = () => {
    compileSass(config.tasks.sass.src + '/app.scss', config.tasks.sass.dest)
    compileJs(config.tasks.js.src + '/app.js', config.tasks.js.dest)
    compileTemplates(config.tasks.templates.src + '/pages/**/*.+(html|nunjucks)', config.tasks.templates.dest)
}

// Set prod env to true and run task
gulp.task('build', ['setProdEnv'], task)

export default task
