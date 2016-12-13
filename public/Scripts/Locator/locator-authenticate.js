// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

/* ========================================================================
 * Authenticate LOGIC
 * ========================================================================
 * 
 * 3rd Party Tool Used - http://eonasdan.github.io/bootstrap-datetimepicker/
 * ======================================================================== */
function DocumentReady_Authenticate() {
    AuthenticateViewSetup();

    WireAuthenticateAccordionsBehaviour();
}

/*
 * This function gets called by the ServiceAddress partial view...in this case, there is no conditionally
 *  required address it is always required if displayed so this isn't really required, but keep so javascript does not throw an error.
 *
 */
// ReSharper disable once UnusedParameter
function SetAddressFieldsRequired(hiddenfield, field) {
    var hiddenElement = $("#frmAuthenticate").find(':input[id="' + hiddenfield + '"]')[0];
    if (hiddenElement) {
        hiddenElement.value = "True";
    }
}
/*
 * Wires up the calander for the DateOfBirth field, sets the max selectable date to today, and the min date to 1900
 * Clears the date of birth date when the pages loads
 *
 * [Enables | Disables] the inputs in the authentication accordions based on the setup on page load
 */
function AuthenticateViewSetup() {

    //var maxDate = new Date();
    //maxDate.setYear(maxDate.getFullYear() -18);
    var maxDate = Date.now();

    // This function will hook the date picker on the Service Request view to the third party code        
    $("div[data-locator-name='dtpDateOfBirth']").datetimepicker({
            allowInputToggle: true, // Allow the text box to display the calander aswel as the icon
            format: "MM/DD/YYYY",
            minDate: Date.parse("1900-01-01"),
            maxDate: maxDate,
            viewMode: "years"
        }).on("dp.show", function() {            
            ApplyStylesToDateTimePicker($(this));
        })        
        .on("dp.update", function() {
            ApplyStylesToDateTimePicker($(this));
        });

    // Sets the Move Date to blank initially
    if ($("div[data-locator-name='dtpDateOfBirth']").length) {
        $("div[data-locator-name='dtpDateOfBirth']").data("DateTimePicker").clear();
    }

    $("div").find("[data-locator-name='AuthOption']").each(function () {

        if (!$(this).hasClass("in")) {
            $(this).find("input:text").prop("disabled", true);
            $(this).find("input:password").prop("disabled", true);
            $(this).find("input:hidden").prop("disabled", true);            
            $(this).find("select").prop("disabled", true);
        } else if ($(this).hasClass("in")) {
            $(this).find("input:text").prop("disabled", false);
            $(this).find("input:password").prop("disabled", false);
            $(this).find("input:hidden").prop("disabled", false);            
            $(this).find("select").prop("disabled", false);
        }
    });    
}

/*
 * Closes all but the current authentication option
 */
function CollapseAllButThisAccordion(currentAccordion) {
    $("div").find("[data-locator-name='AuthOption']").each(function () {
       if($(this) !== currentAccordion) {
           $(this).collapse("hide");
       } 
    });
}

/*
 * Wires up the changing of glyphicons to the show and hidden functions for the accordions
 * This changes the arrow between the right and down directions
 *
 * This will [enable | disable] the html inputs in the accordions based on the open accordion.
 * It will also collapse all but the open accordion
 * The html inputs are disabled so they do not interfere with the [client | server] side validation
 * Disabled inputs will not be used in binding when posting back to the server
 */
function WireAuthenticateAccordionsBehaviour() {

    $(".collapse").on("show.bs.collapse", function () {
        $(this).parent().find(".glyphicon-triangle-right").removeClass("glyphicon-triangle-right").addClass("glyphicon-triangle-bottom");

        $(this).find("input:text").prop("disabled", false);
        $(this).find("input:password").prop("disabled", false);
        $(this).find("input:hidden").prop("disabled", false);        
        $(this).find("select").prop("disabled", false);
        CollapseAllButThisAccordion($(this));
    });

    $(".collapse").on("hidden.bs.collapse", function () {
        $(this).parent().find(".glyphicon-triangle-bottom").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-right");

        $(this).find("input:text").prop("disabled", true);
        $(this).find("input:password").prop("disabled", true);
        $(this).find("input:hidden").prop("disabled", true);        
        $(this).find("select").prop("disabled", true);
    });
}

/*
 * Shows the value of the hidden custom authentication fields by changing the input type
 * Changes the glyphicon from between and [open | closed] eye
 */
function ShowPasswordByButton(showButton) {

    var viewElement = $(showButton).prev("input");

    viewElement.attr("type", "text");
    viewElement.siblings("div").children("span").removeClass("glyphicon-eye-close");
    viewElement.siblings("div").children("span").addClass("glyphicon-eye-open");
}

/*
 * Hides the value of the hidden custom authentication fields by changing the input type
 * Changes the glyphicon from between and [open | closed] eye
 */
function HidePasswordByButton(hideButton) {

    var viewElement = $(hideButton).prev("input");

    viewElement.attr("type", "password");
    viewElement.siblings("div").children("span").removeClass("glyphicon-eye-open");
    viewElement.siblings("div").children("span").addClass("glyphicon-eye-close");
}

/*
 * Shows the value of the hidden standard authentication fields by changing the input type, this applies to [SSN | SSN4]
 * Changes the glyphicon from between and [open | closed] eye
 */
function ShowPassword(passwordElement) {

    var viewElement = $("#" + passwordElement);

    viewElement.attr("type", "text");
    viewElement.siblings("div").children("span").removeClass("glyphicon-eye-close");
    viewElement.siblings("div").children("span").addClass("glyphicon-eye-open");
}

/*
 * Hides the value of the hidden standard authentication fields by changing the input type, this applies to [SSN | SSN4]
 * Changes the glyphicon from between and [open | closed] eye
 */
function HidePassword(passwordElement) {

    var viewElement = $("#" + passwordElement);

    viewElement.attr("type", "password");
    viewElement.siblings("div").children("span").removeClass("glyphicon-eye-open");
    viewElement.siblings("div").children("span").addClass("glyphicon-eye-close");
}
