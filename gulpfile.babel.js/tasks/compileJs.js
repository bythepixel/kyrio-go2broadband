import config from '../config'
import gulp from 'gulp'
import gulpIf from 'gulp-if'
import uglify from 'gulp-uglify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import babel from 'babelify'
import handleError from '../lib/handleJsError'
import chalk from 'chalk'

const compileConsoleNotify = (_in, _out) => {
    return console.log(`Compiling js from ${chalk.underline.cyan(_in)} to ${chalk.underline.green(_out)}`)
}

// Compile and bundle all js with broserify
function compile(_in, _out, name = 'app.js') {
    // Show a console notification
    compileConsoleNotify(_in, _out);
    // Run the task
    return browserify(_in, {
            debug: !config.isProduction()
        })
        .transform(babel) // Transform with babelify which allows us to use ES6
        .bundle() // bundle all js
        .on('error', handleError) // Handle any js errors
        .pipe(source(name)) // Init the output source stream
        .pipe(buffer())
        .pipe(uglify()) // minify
        .pipe(gulp.dest(_out)) // Push to the output
}

gulp.task('compileJs', function() {
    compile(config.tasks.js.src + '/app.js', config.tasks.js.dest)
})

export default compile
