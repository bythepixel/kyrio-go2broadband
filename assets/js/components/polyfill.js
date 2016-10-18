/**
 * Polyfill for js CustomEvent
 */
const customEventPoly = () => {
    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
}

/**
 * Polyfill for js classList
 */
const classListPoly = () => {
    if ("document" in self) {

        // Full polyfill for browsers with no classList support
        // Including IE < Edge missing SVGElement.classList
        if (!("classList" in document.createElement("_")) ||
            document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

            ((view => {
                if (!('Element' in view)) return;

                const classListProp = "classList";
                const protoProp = "prototype";
                const elemCtrProto = view.Element[protoProp];
                const objCtr = Object;

                const strTrim = String[protoProp].trim || function() {
                    return this.replace(/^\s+|\s+$/g, "");
                };

                const // Vendors: please allow content code to instantiate DOMExceptions
                    arrIndexOf = Array[protoProp].indexOf || function(item) {
                    let i = 0;
                    const len = this.length;
                    for (; i < len; i++) {
                        if (i in this && this[i] === item) {
                            return i;
                        }
                    }
                    return -1;
                };

                const DOMEx = function(type, message) {
                    this.name = type;
                    this.code = DOMException[type];
                    this.message = message;
                };

                const checkTokenAndGetIndex = (classList, token) => {
                    if (token === "") {
                        throw new DOMEx(
                            "SYNTAX_ERR", "An invalid or illegal string was specified"
                        );
                    }
                    if (/\s/.test(token)) {
                        throw new DOMEx(
                            "INVALID_CHARACTER_ERR", "String contains an invalid character"
                        );
                    }
                    return arrIndexOf.call(classList, token);
                };

                const ClassList = function(elem) {
                    const trimmedClasses = strTrim.call(elem.getAttribute("class") || "");
                    const classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [];
                    let i = 0;
                    const len = classes.length;
                    for (; i < len; i++) {
                        this.push(classes[i]);
                    }
                    this._updateClassName = function() {
                        elem.setAttribute("class", this.toString());
                    };
                };

                const classListProto = ClassList[protoProp] = [];

                const classListGetter = function() {
                    return new ClassList(this);
                };

                // Most DOMException implementations don't allow calling DOMException's toString()
                // on non-DOMExceptions. Error's toString() is sufficient here.
                DOMEx[protoProp] = Error[protoProp];
                classListProto.item = function(i) {
                    return this[i] || null;
                };
                classListProto.contains = function(token) {
                    token += "";
                    return checkTokenAndGetIndex(this, token) !== -1;
                };
                classListProto.add = function() {
                    const tokens = arguments;
                    let i = 0;
                    const l = tokens.length;
                    let token;
                    let updated = false;
                    do {
                        token = `${tokens[i]}`;
                        if (checkTokenAndGetIndex(this, token) === -1) {
                            this.push(token);
                            updated = true;
                        }
                    }
                    while (++i < l);

                    if (updated) {
                        this._updateClassName();
                    }
                };
                classListProto.remove = function() {
                    const tokens = arguments;
                    let i = 0;
                    const l = tokens.length;
                    let token;
                    let updated = false;
                    let index;
                    do {
                        token = `${tokens[i]}`;
                        index = checkTokenAndGetIndex(this, token);
                        while (index !== -1) {
                            this.splice(index, 1);
                            updated = true;
                            index = checkTokenAndGetIndex(this, token);
                        }
                    }
                    while (++i < l);

                    if (updated) {
                        this._updateClassName();
                    }
                };
                classListProto.toggle = function(token, force) {
                    token += "";

                    const result = this.contains(token);

                    const method = result ?
                        force !== true && "remove" :
                        force !== false && "add";

                    if (method) {
                        this[method](token);
                    }

                    if (force === true || force === false) {
                        return force;
                    } else {
                        return !result;
                    }
                };
                classListProto.toString = function() {
                    return this.join(" ");
                };

                if (objCtr.defineProperty) {
                    const classListPropDesc = {
                        get: classListGetter,
                        enumerable: true,
                        configurable: true
                    };
                    try {
                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                    } catch (ex) { // IE 8 doesn't support enumerable:true
                        if (ex.number === -0x7FF5EC54) {
                            classListPropDesc.enumerable = false;
                            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                        }
                    }
                } else if (objCtr[protoProp].__defineGetter__) {
                    elemCtrProto.__defineGetter__(classListProp, classListGetter);
                }
            })(self));

        } else {
            // There is full or partial native classList support, so just check if we need
            // to normalize the add/remove and toggle APIs.

            ((() => {
                let testElement = document.createElement("_");

                testElement.classList.add("c1", "c2");

                // Polyfill for IE 10/11 and Firefox <26, where classList.add and
                // classList.remove exist but support only one argument at a time.
                if (!testElement.classList.contains("c2")) {
                    const createMethod = method => {
                        const original = DOMTokenList.prototype[method];

                        DOMTokenList.prototype[method] = function(token) {
                            let i;
                            const len = arguments.length;

                            for (i = 0; i < len; i++) {
                                token = arguments[i];
                                original.call(this, token);
                            }
                        };
                    };
                    createMethod('add');
                    createMethod('remove');
                }

                testElement.classList.toggle("c3", false);

                // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
                // support the second argument.
                if (testElement.classList.contains("c3")) {
                    const _toggle = DOMTokenList.prototype.toggle;

                    DOMTokenList.prototype.toggle = function(token, force) {
                        if (1 in arguments && !this.contains(token) === !force) {
                            return force;
                        } else {
                            return _toggle.call(this, token);
                        }
                    };

                }

                testElement = null;
            })());

        }

    }

}

export { customEventPoly, classListPoly };
