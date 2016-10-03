import notify from "gulp-notify"

const formatTitle = err => {
    const fileArr = err.filename.split('/');
    const file = fileArr[fileArr.length - 2] + '/' + fileArr[fileArr.length - 1];
    return `${err.loc.line}:${err.loc.column} ${file}`;
}

export default err => {
    notify({
        templateOptions: {
            file: formatTitle(err),
            message: err.stack
        },
        title: "<%= options.file %>",
        message: "<%= options.message %>",
        sound: "Sosumi"
    }).write(err);
}
