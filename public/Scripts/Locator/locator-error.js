// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

// ReSharper disable InconsistentNaming
// ReSharper disable UnusedParameter

/* ========================================================================
 * Error LOGIC
 * ========================================================================
 * 
 * ======================================================================== */
/*
 * This function will be used to display a modal when an ajax error occurs
 */
function HandleAjaxError(jqXHR, textStatus) {

    $.ajax({
        url: "/Error/AjaxError",
        cache: false
    })
        .fail(function (jqXHR, textStatus) {
            HandleError(jqXHR, textStatus);
        })
        .done(function (data) {
            $("#divAjaxError").html(data);
            $("#modalAjaxError").modal("show");
        });  
}

/*
 * This function will be used to display a popup if the ajax calls are failing
 */
function HandleError(jqXHR, textStatus) {

    alert("An error occurred, please try the operation again");

    // These variables can be used to get the error type that occurred - this should be written to the event log ???
    //alert("ReadyState: " + jqXHR.readyState);
    //alert("Response: " + jqXHR.responseText);
    //alert("Error: " + textStatus);
}