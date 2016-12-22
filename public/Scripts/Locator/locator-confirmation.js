// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

// ReSharper disable InconsistentNaming

/* ========================================================================
 * Confirmation LOGIC
 * ========================================================================
 * 
 * ======================================================================== */

/*
 * This function will print the confirmation page
 */
function Print() {
   
    $.ajax({
        url: "/Confirmation/Print",
        cache: false,
        async: false
    })
        .fail(function (jqXHR, textStatus) {
            HandleAjaxError(jqXHR, textStatus);
        })
        .done(function (data) {
            OpenPrintWindow(data);
        });    
}

/*
 * This function will open a new browser window and load the html for the printed page into the document
 * The print window will be opened when the page is loaded
 * When the print window is closed, the html window that created it will also be closed
 */
function OpenPrintWindow(data) {

    var printWindow = window.open("", "_blank");

    // Write to the document so the styles will be applied
    printWindow.document.write(data);
    
    // Set a timeout so that the page will load before we continue
    setTimeout(function() {
         printWindow.print();
    }, 500);

    // Hook up the closing of the print window
    // This has to be done after the window is visible
    // If close is called directly after print, close will fire before print in some cases causing the print window to load with no data    
    printWindow.onfocus = function () {
        setTimeout(function() {
             printWindow.close();
        }, 500);
    }    
}