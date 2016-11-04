import routes from './routes'
import browserSync from './browserSync'
import templates from './templates'
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
        templates: templates,
        sass: sass,
        js: js,
    }
}
