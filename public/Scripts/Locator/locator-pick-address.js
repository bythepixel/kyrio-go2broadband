// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

/* ========================================================================
 * Pick Address LOGIC
 * ========================================================================
 * 
 * ======================================================================== */

/*
 * Assigned the address id for the selected address to teh hidden field so the comtroller can determine whether to call a query offers resubmit
 * or simply display the offers from the query offers response [If they are available]
 */
function HandlePickAddressOperations(selectedAddressId) {

    if ($("input[name = addressSuggestion]:checked").val()) {
        $("#btnChangeAddressNext").css("visibility", "visible");
        $("#hiddenSelectedAddressId").val(selectedAddressId);
    } else {
        $("#btnChangeAddressNext").css("visibility", "hidden");        
    }        
}
