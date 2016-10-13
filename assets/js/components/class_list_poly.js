const classListPoly = () => {
    if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {
        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get() {
                const self = this;

                function update(fn) {
                    return value => {
                        const classes = self.className.split(/\s+/);
                        const index = classes.indexOf(value);

                        fn(classes, index, value);
                        self.className = classes.join(" ");
                    }
                }

                const ret = {
                    add: update((classes, index, value) => {
                        ~index || classes.push(value);
                    }),

                    remove: update((classes, index) => {
                        ~index && classes.splice(index, 1);
                    }),

                    toggle: update((classes, index, value) => {
                        ~index ? classes.splice(index, 1) : classes.push(value);
                    }),

                    contains(value) {
                        return !!~self.className.split(/\s+/).indexOf(value);
                    },

                    item(i) {
                        return self.className.split(/\s+/)[i] || null;
                    }
                };

                Object.defineProperty(ret, 'length', {
                    get() {
                        return self.className.split(/\s+/).length;
                    }
                });

                return ret;
            }
        });
    }
}

export { classListPoly };
