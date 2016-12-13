// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

/* ========================================================================
 * Calendar LOGIC
 * ========================================================================
 *
 * This is used to applied our required changes to the 3rd party calendar
 *
 * 3rd Party Tool Used - http://eonasdan.github.io/bootstrap-datetimepicker/
 * ======================================================================== */

/*
 * Applies the styles to the 3rd party DateTimePicker, based on the classes and data attributes the calander uses
 * 
 * Due to a [BUG] in the calander, the selection of decades is disabled by removing the data attributes that it uses
 */
function ApplyStylesToDateTimePicker(dateTimePicker) {
    $(dateTimePicker).find(".datepicker-days td[data-action='selectDay']").filter(function () {
        if ($(this).hasClass("disabled")) {
            $(this).addClass("locator-calander-slot-off");

        } else if ($(this).hasClass("active")) {
            $(this).addClass("locator-calander-slot-active");

        }else {
            $(this).addClass("locator-calander-slot-on");
        }
    });

    $(dateTimePicker).find(".datepicker-months table tr td span").filter(function () {
        if ($(this).hasClass("disabled")) {
            $(this).addClass("locator-calander-slot-off");
        } else {
            $(this).addClass("locator-calander-slot-on");
        }
    });

    $(dateTimePicker).find(".datepicker-years table tr td span").filter(function () {
        if ($(this).hasClass("disabled")) {
            $(this).addClass("locator-calander-slot-off");
        } else {
            $(this).addClass("locator-calander-slot-on");
        }
    });

    $(dateTimePicker).find("th[data-action='pickerSwitch']").filter(function () {
        if ($(this).attr("title") === "Select Decade") {
            $(this).removeAttr("data-action");
            $(this).addClass("locator-calander-picker-off");
        }
    });
}
