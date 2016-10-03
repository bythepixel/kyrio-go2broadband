/**
 * BrowserSync config
 *
 * In order to speed up development, we'll watch for changes in files while we're
 * devving. BrowserSync will automatically inject those changes for us if they're
 * css changes or reload the page if they're js changes.
 */
export default {
    // Tell BrowserSync where to start its Node server
    server: {
        baseDir: "public"
    },
    // Inject the css changes
    injectChanges: true,
    // Don't show a growl notification everytime a change is detected
    notify: false,
}
