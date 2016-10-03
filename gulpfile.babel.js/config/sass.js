import routes from './routes'

export default {
    // Input directory
    src : routes.src + "/sass",
    // Output directory
    dest: routes.dest + "/css",
    extension: "scss",
    support: {
        // Autoprefixer config to automatically match
        // browser support following these rules
        browsers: ["> 5%", "last 3 versions"],
        config : {
            // Sass dev output rules
            dev : {
                indentedSyntax: true,
                outputStyle: "expanded",
                omitSourceMapUrl: true
            },
            // Sass prod output rules
            prod: {
                omitSourceMapUrl: true
            }
        }
    }
}
