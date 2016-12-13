// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

/* ========================================================================
 * Variables
 * ========================================================================
 * Variables that need to be initialized before any logic runs
 * ======================================================================== */

// ReSharper disable Es6Feature
/*
 * Javascript enums, only available for the Es6 version of javascript
 * ECMA Script 6 Compatibility Table - https://kangax.github.io/compat-table/es6/
 *
 * [BUG] const might not work on Apple products
 */
//const stepType = {
// Const will not work on Safari and older versions of some other browsers [IE]
var stepType = {
    INACTIVE: 0,
    ACTIVE: 1,
    COMPLETE: 2
};

var activeGlyphs = ["nothing", "glyphicon-search", "fa-mouse-pointer", "glyphicon-cog", "glyphicon-wrench", "glyphicon-credit-card", "fa-calendar-o"];
var completeGlyph = "glyphicon-ok-sign";

var glyphLibrary = ["fa", "glyphicon"];

/* ========================================================================
 * Header Menu Logic
 * ========================================================================
 * 
 * This handles the progression bar and it's style changes
 * ======================================================================== */
function DocumentReady_Header() {
    ApplyHeaderStyles($("#divProgress").data("step"));
}

/*
 * Applies the header styles based on the current step
 */
function ApplyHeaderStyles(currentStep) {

    var totalSteps = 6;
    for (var step = 1; step <= totalSteps; step++) {
        if (step < currentStep) {
            ApplyCompleteStyles(step);
        }
        else if (step === currentStep) {
            ApplyActiveStyles(step);
        }
        else if (step > currentStep) {
            ApplyInactiveStyles(step);
        }

        var stepIcon = $("#divStep" + step).find("[name='stepIcon']");

        if (!stepIcon.hasClass("glyphicon"))
            stepIcon.addClass("glyphicon");
    }
}

/*
 * This function will replace the css classes
 */
function replaceClasses(step, section, toRemove, toAdd) {
    
    var obj = $("#divStep" + step).find("[name='" + section + "']");

    obj.each(function() {

        // This statement will stop the glyphicon changing to a tick and just change the color to green for the complete steps
        // This is for use on xs screen sizes, the text is still to large for IPhone 5
        // To switch back to the tick mark just comment out this code - do not remove the [each loop]
        if (section === "stepIcon") {
            if ($(this).parent().hasClass("visible-xs")) {
                if (toAdd === "glyphicon-ok-sign") {

                    $(this).addClass(toRemove);
                    return;
                } else if (toRemove === "fa") {
                    $(this).addClass(toRemove);
                    return;
                }
            }
        }

        if (toRemove) {
            var classes = toRemove.split(" ");
            // ReSharper disable once MissingHasOwnPropertyInForeach
            for (var c in classes) {
                if ($(this).hasClass(classes[c])) {
                    $(this).removeClass(classes[c]);
                }
            }
        }

        if (toAdd) {
            $(this).addClass(toAdd);
        }
    });
}

/*
 * Applies the active header styles to the step
 */
function ApplyActiveStyles(step) {
    replaceClasses(step, "stepOuter", "locator-progress-step-outer-complete", "locator-progress-step-outer-active");
    replaceClasses(step, "stepInner", "locator-progress-step-inner-complete", "locator-progress-step-inner-active");
    replaceClasses(step, "stepIcon", "locator-progress-step-glyphicon-inactive", "locator-progress-step-glyphicon-active");
    replaceClasses(step, "stepName", "locator-font-header-medium-inactive", "locator-font-header-medium");
    replaceClasses(step, "stepDescription", "locator-font-header-regular-inactive", "locator-font-header-regular");

    ChangeGlyphIcon(step, stepType.ACTIVE);
}

/*
 * Applies the complete header styles to the step
 */
function ApplyCompleteStyles(step) {

    replaceClasses(step, "stepOuter", "locator-progress-step-outer-active", "locator-progress-step-outer-complete");
    replaceClasses(step, "stepInner", "locator-progress-step-inner-active", "locator-progress-step-inner-complete");
    replaceClasses(step, "stepIcon", "locator-progress-step-glyphicon-active", "locator-progress-step-glyphicon-complete");
    replaceClasses(step, "stepName", "locator-font-header-medium-inactive", "locator-font-header-medium");
    replaceClasses(step, "stepDescription", "locator-font-header-regular-inactive", "locator-font-header-regular");

    ChangeGlyphIcon(step, stepType.COMPLETE);
}

/*
 * Applies the inactive header styles to the step
 */
function ApplyInactiveStyles(step) {
    replaceClasses(step, "stepOuter", "locator-progress-step-outer-active locator-progress-step-outer-complete");
    replaceClasses(step, "stepInner", "locator-progress-step-inner-complete locator-progress-step-inner-active");
    replaceClasses(step, "stepIcon", "locator-progress-step-glyphicon-active locator-progress-step-glyphicon-complete", "locator-progress-step-glyphicon-inactive");
    replaceClasses(step, "stepName", "locator-font-header-medium", "locator-font-header-medium-inactive");
    replaceClasses(step, "stepDescription", "locator-font-header-regular", "locator-font-header-regular-inactive");

    ChangeGlyphIcon(step, stepType.INACTIVE);
}

/*
 * Changes the glyphicon based on the step and operation [Active | Inactive | Complete]
 */
function ChangeGlyphIcon(step, operation) {

    if (operation === stepType.ACTIVE) {
        replaceClasses(step, "stepIcon", completeGlyph, activeGlyphs[step]);
        if (step === 2 || step === 6) {
            replaceClasses(step, "stepIcon", glyphLibrary[1], glyphLibrary[0]);
        }
    }
    else if (operation === stepType.INACTIVE) {
        replaceClasses(step, "stepIcon", completeGlyph, activeGlyphs[step]);
        if (step === 2 || step === 6) {
            replaceClasses(step, "stepIcon", glyphLibrary[1], glyphLibrary[0]);
        }
    }
    else if (operation === stepType.COMPLETE) {
        replaceClasses(step, "stepIcon", activeGlyphs[step], completeGlyph);
        if (step === 2 || step === 6) {
            replaceClasses(step, "stepIcon", glyphLibrary[0], glyphLibrary[1]);
        }
    }
}
