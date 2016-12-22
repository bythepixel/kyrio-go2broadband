// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

/* ========================================================================
 * Locator String Length Validation Attribute LOGIC
 * ========================================================================
 * This wires up the server side model validation to the client side 
 * implementation using jquery and the mvc unobtrusive validation files
 * ======================================================================== */
var returnRelatedElement = function (currentelementname, relatedelementname) {
    var getModelPrefix = function (fieldName) {
        return fieldName.substr(0, fieldName.lastIndexOf(".") + 1);
    }
    var prefix = getModelPrefix(currentelementname),
    fullOtherName = prefix + relatedelementname;

    return fullOtherName;
};

$.validator.unobtrusive.adapters.add(
    "requiredif", ["conditionalfield"], function (options) {

        var fullOtherName = returnRelatedElement(options.element.name, options.params.conditionalfield),
        element = $(options.form).find(':input[name="' + fullOtherName + '"]')[0];

        options.rules["conditionalif"] = element;
        if (options.message) {
            options.messages["conditionalif"] = options.message;
        }
    }
);

$.validator.addMethod("conditionalif", function (value, element, params) {
    var conditionalField = $(params).val();
    if (conditionalField) {
        if (conditionalField.toLowerCase() !== "true")
            return true;        

        if (value) {
            // Applies validation styles to the header pane
            //UpdateCustomizationHeader(element, value.length > 0);
            return value.length > 0;
        } else {
            // Applies validation styles to the header pane
            //UpdateCustomizationHeader(element, true);
            return false;
        }
    }
    return true;
}, "");

$.validator.unobtrusive.adapters.add(
    "dynamicmaxlength", ["maxlengthfield"], function (options) {

        var fullOtherName = returnRelatedElement(options.element.name, options.params.maxlengthfield),
            element = $(options.form).find(':input[name="' + fullOtherName + '"]')[0];

        options.rules["dynamiclength"] = element;
        if (options.message) {
            options.messages["dynamiclength"] = options.message;
        }
    }
);

$.validator.addMethod("dynamiclength", function (value, element, params) {
    var lengthField = $(params).val();
    if (lengthField) {
        if (value)
            return value.length <= parseInt(lengthField);
        else
            return true;
    }
    return true;
}, "");

$.validator.unobtrusive.adapters.add(
    "dynamicintrange", ["minvaluefield", "maxvaluefield"], function (options) {

        var fullMinName = returnRelatedElement(options.element.name, options.params.minvaluefield),
            fullMaxName = returnRelatedElement(options.element.name, options.params.maxvaluefield),
            minelement = $(options.form).find(':input[name="' + fullMinName + '"]')[0],
            maxelement = $(options.form).find(':input[name="' + fullMaxName + '"]')[0];

        options.rules["dynamicrange"] = {
            minvaluefield: minelement,
            maxvaluefield: maxelement
        };
        if (options.message) {
            options.messages["dynamicrange"] = options.message;
        }
    }
);

$.validator.addMethod("dynamicrange", function (value, element, params) {
    var minValue = params.minvaluefield;
    var maxValue = params.maxvaluefield;
    if (minValue) {
        if (maxValue) {
            if (value)
                return (parseInt(value) >= parseInt(minValue.value) && parseInt(value) <= parseInt(maxValue.value));
            else
                return true;
        }
        else return true;
    }
    return true;
}, "");

$.validator.unobtrusive.adapters.add(
    "checkrequired", ["conditionalfield"], function (options) {

        var fullOtherName = returnRelatedElement(options.element.name, options.params.conditionalfield),
            element = $(options.form).find(':input[name="' + fullOtherName + '"]')[0];

        options.rules["requiredcheck"] = element;
        if (options.message) {
            options.messages["requiredcheck"] = options.message;
        }
    }
);

$.validator.addMethod("requiredcheck", function (value, element, params) {
    var conditionalField = $(params).val();
    if (conditionalField) {
        if (conditionalField.toLowerCase() !== "true")
            return true;
        if (value)
            return value;
        else
            return false;
    }
    return true;
}, "");

// checkbox validation
$.validator.addMethod("dynamicsrange", function (value, element, params) {
    var minValue = params.minvaluefield;
    var maxValue = params.maxvaluefield;

    if (parseInt(maxValue.value) <= 1) return true; // validate by radio rather than checkbox

    if (parseInt(minValue.value) === 0) return true;

    if (minValue) {
        if (maxValue) {
            if (value)
                return (parseInt(value) >= parseInt(minValue.value) && parseInt(value) <= parseInt(maxValue.value));
            else
                return true;
        }
        else return true;
    }
    return true;
}, "");