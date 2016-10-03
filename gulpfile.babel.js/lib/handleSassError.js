import notify from 'gulp-notify'

const formatTitle = (err) => {
    return 'line ' + err.line + ':' + err.column + ' - ' + err.relativePath.replace(/^.*[\\\/]/, '');
}

export default err => {
    notify({
        templateOptions: {
            file: formatTitle(err),
            message: err.messageOriginal
        },
        title: "<%= options.file %>",
        message: "<%= options.message %>",
        sound: "Sosumi"
    }).write(err);
}
