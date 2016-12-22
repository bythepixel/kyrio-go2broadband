// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

/* ========================================================================
 * Verify LOGIC
 * ========================================================================
 * 
 * ======================================================================== */
function DocumentReady_Verify() {    
    $("#btnEditInformation").data("edit", false);

    ToggleEditableInformationForVerify("divEditableInformation", "btnEditInformation");    
}

/*
 * Toggles the editable fields [On | Off]
 */
function ToggleEditableInformationForVerify(parent, button) {

    var parentElement = $("#" + parent);
    var buttonElement = $("#" + button);

    var editInforamtion = buttonElement.data("edit");

    var isEditSet = (editInforamtion === true);

    parentElement.find("input:text").prop("readonly", !isEditSet);
    parentElement.find("input:text").each(function () {
        if (!isEditSet) {
            $(this).addClass("locator-cursor-disable");
        } else {
            $(this).removeClass("locator-cursor-disable");
        }
    });

    parentElement.find("input:password").prop("readonly", !isEditSet);
    parentElement.find("input:password").each(function () {
        if (!isEditSet) {
            $(this).addClass("locator-cursor-disable");
        } else {
            $(this).removeClass("locator-cursor-disable");
        }
    });

    parentElement.find("textarea").prop("readonly", !isEditSet);
    parentElement.find("textarea").each(function () {
        if (!isEditSet) {
            $(this).addClass("locator-cursor-disable");
        } else {
            $(this).removeClass("locator-cursor-disable");
        }
    });
    
    parentElement.find("select").prop("disabled", !isEditSet);
    parentElement.find("select").each(function () {
        var id = $(this).attr("id");
        $("input#" + id).val($("#" + id).val());
    });

    parentElement.find("a").each(function() {
        if (!isEditSet) {
            $(this).addClass("locator-link-disabled locator-cursor-disable");
        } else {
            $(this).removeClass("locator-link-disabled locator-cursor-disable");
        }    
    });
    
    buttonElement.data("edit", editInforamtion === true ? false : true);

    if (editInforamtion) {
        //buttonElement.text("Save Info");
        // Due to the validation not being run on disabled fields, once the user clicks the edit button, the edit mode is permenant
        // Select tags are still selectable when the readonly property is applied
        buttonElement.hide();
    } else {
        buttonElement.text("Edit Info");
    }
}