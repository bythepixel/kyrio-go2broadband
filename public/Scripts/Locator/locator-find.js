// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

/* ========================================================================
 * Find LOGIC
 * ========================================================================
 *
 * 3rd Party Tool Used - http://eonasdan.github.io/bootstrap-datetimepicker/
 * ======================================================================== */
function DocumentReady_Find() {
    WireUpMovedDate();
}

/*
 * This function will attempt to get the move date from the input field. This will be used when the user hits the back button and returns to this page
 * If the moveDate value is null the current date will be passed back
 */
function GetMoveDate() {
    var moveDate = $("input[id = 'moveDate']").val();

    if (moveDate) {
        return moveDate;
    }

    return "now";
}

/*
 * Wires up the Moved Date calander, clears and hides it on page load.
 * Applies the calander styles
 * Wires up the display of the calander to the NewCustomer check box
 */
function WireUpMovedDate() {
    // This function will hook the date picker on the Service Request view to the third party code    
    $("#dtpMoveDate").datetimepicker({
            allowInputToggle: true, // Allow the text box to display the calander aswel as the icon
            format: "MM/DD/YYYY",
            minDate: GetMoveDate(),
            debug: true //This will keep the calander open
        })
        .on("dp.show", function () {
            ApplyStylesToDateTimePicker($(this));            
        })
        .on("dp.update", function () {
            ApplyStylesToDateTimePicker($("#dtpMoveDate").datetimepicker);
        });

    // Sets the Move Date to blank initially -- modified to only set to blank if the value of the newCustomer checkbox is not set
    var newCustomerCheckBox = $("input[data-locator-name = 'newCustomer']")[0];

    if (newCustomerCheckBox) {

        if (newCustomerCheckBox.checked === false) {
            if ($("#dtpMoveDate").length) {
                $("#dtpMoveDate").data("DateTimePicker").clear();
            }

            $("#divMoveDateContainer").hide();
        } else {
            var datePicked = $("input[id = 'moveDate']")[0];

            if (datePicked) {
                var tempDate = datePicked.value;
                $("#dtpMoveDate").data("DateTimePicker").date(tempDate);
            }
        }
    }

    $("input[data-locator-name = 'newCustomer']").change(function() {        
        $("#divMoveDateContainer").toggle();
        $("#dtpMoveDate").data("DateTimePicker").clear();

        if ($(this).is(":checked")) {            
            $("#dtpMoveDate").data("DateTimePicker").enable();
        } else {            
            $("#dtpMoveDate").data("DateTimePicker").disable();
        }       
    });
}