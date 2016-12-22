// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

/* ========================================================================
 * Client Page Load LOGIC
 * ========================================================================
 * These functions need to be run for each page load  
    //if( value ) {}
    //  will evaluate to true if value is not:
    //      null
    //      undefined
    //      NaN
    //      empty string ("")
    //      0
    //      false

    //if (typeof foo !== 'undefined') {
        // foo could get resolved and it's defined
    //}
 * ======================================================================== */
$(document).ready(function () {    

    // Attempt at expiring the session when the browser is closed - extremly unreliable
    //SessionClearingEvents();

    DocumentReady_Header();
    DocumentReady_Footer();

    // If we are not on the first form - Run the cart setup functions
    if (!$("#frmServiceRequest").length > 0) {
        DocumentReady_Cart();
    }
    
    if ($("#frmServiceRequest").length > 0) {
        DocumentReady_Find();
    }
    
    if ($("#frmOffers").length > 0 || $("#frmPickAddress").length > 0 || $("#frmPickMso").length > 0) {
        DocumentReady_Select();        
    }

    if ($("#frmCustomize").length > 0) {
        DocumentReady_Customize();
    }
    
    if ($("#frmAuthenticate").length > 0) {
        DocumentReady_Authenticate();
    }

    if ($("#frmSubmitOrder").length > 0) {
        DocumentReady_SubmitOrder();
    }

    if ($("#frmVerify").length > 0) {
        DocumentReady_Verify();        
    }

    if ($("#frmSchedule").length > 0) {
        DocumentReady_Schedule();
    }

    MaskField("securityCode");
    MaskField("cardNumber");

    SetCreditCardType();
});
