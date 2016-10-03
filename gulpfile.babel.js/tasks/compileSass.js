import gulp from'gulp'
import browserSync from'browser-sync'
import sass from'gulp-sass'
import handleErrors from'../lib/handleSassError'
import autoprefixer from'autoprefixer'
import cleanCSS from'gulp-clean-css'
import postcss from'gulp-postcss'
import gulpIf from'gulp-if'
import combineMQ from'gulp-merge-media-queries'
import config from'../config'
import chalk from'chalk'
import flexibility from 'postcss-flexibility'

const processors = [
    autoprefixer({browsers: config.tasks.sass.support.browsers}),
    flexibility
];

// Show the compression difference before and after minifying
const minifyCss = () => {
    return cleanCSS({debug: true}, function(details) {
        return console.log(
            details.name + ': ' +
            chalk.underline.cyan(details.stats.originalSize * 0.001 + 'kB') + ' => ' +
            chalk.underline.cyan(details.stats.minifiedSize * 0.001 + 'kB') + ' ' +
            chalk.gray((details.stats.efficiency * 100).toFixed(2) + '% savings')
        );
    })
}

const compile = (_in, _out) => {
    return gulp.src(_in)
        .pipe(sass()) // Run the sass task
        .on('error', handleErrors) // Handle any errors
        .pipe(combineMQ({ // Combine the media
            log: !config.isProduction()
        }))
        .pipe(postcss(processors)) // Handle post processing of css
        .pipe(minifyCss()) // Minify css
        .pipe(gulp.dest(_out)) // Push to output directory
        .pipe(gulpIf(!config.isProduction(), browserSync.stream())) // Sync browsersync if not prod
}

gulp.task('compileSass', () => {
    compile(config.tasks.sass.src + '/app.scss', config.tasks.sass.dest)
})

export default compile
