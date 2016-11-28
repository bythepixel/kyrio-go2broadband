import notify from 'gulp-notify'

export default err => {
    notify({
        templateOptions: {
            file: err.name,
            message: err.message
        },
        title: "<%= options.file %>",
        message: "<%= options.message %>",
        sound: "Sosumi"
    }).write(err);
}
