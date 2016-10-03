import routes from './routes'
import browserSync from './browserSync'
import sass from './sass'
import js from './js'

/**
 * Default config object for the build process
 */
export default {
    env: process.env.NODE_ENV,
    routes: routes,
    isProduction() {
        return this.env === 'production'
    },
    // Task specific config should be added here
    tasks: {
        browserSync: browserSync,
        sass: sass,
        js: js,
    }
}
