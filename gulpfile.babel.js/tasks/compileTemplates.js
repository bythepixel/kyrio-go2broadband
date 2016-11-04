import gulp from'gulp'
import handleErrors from'../lib/handleTemplateError'
import gulpIf from 'gulp-if'
import config from '../config'
import render from 'gulp-nunjucks-render'
import chalk from 'chalk'

const compileConsoleNotify = (_in, _out) => {
    return console.log(`Compiling templates from ${chalk.underline.cyan(_in.replace('/**/*.+(html|nunjucks)', ''))} to ${chalk.underline.green(_out)}`)
}

const compile = (_in, _out) => {
    // Show a console notification on build
    compileConsoleNotify(_in, _out);
    // Run the task
    return gulp.src(_in)
        .pipe(render({ // Run the templating task
            path: [
                config.tasks.templates.src + '/layouts/',
            ]
        }))
        .on('error', handleErrors)
        .pipe(gulp.dest(_out)) // Push to output directory
}

gulp.task('compileTemplates', () => {
    compile(config.tasks.templates.src + '/pages/**/*.+(html|nunjucks)', config.tasks.templates.dest)
})

export default compile
