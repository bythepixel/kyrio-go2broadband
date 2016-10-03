export default {
    globToObject(input, fn) {
        return typeof input === 'string' ? [input] : input;
    }
}
