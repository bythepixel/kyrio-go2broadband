// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

// ReSharper disable InconsistentNaming

/* ========================================================================
 * Cart LOGIC
 * ========================================================================
 * 
 * ======================================================================== */
function DocumentReady_Cart() {
    WireAddToCartLinks();
    RefreshOperationNextButton();
    WireRemoveFromCartLinks();
}

/*
 * Handle the session timeout and reload the main page
 * Reloads the bodyMaster with the session timeout view
 * Reapplies the header styles for the current step
 * Calls the footer ready function to re setup the footer since we're not actually reloading the entire page 
 */
function HandleSessionTimeout(data) {
    RefreshDocument(data, "bodyMaster");

    ApplyHeaderStyles($("#divProgress").data("step"));

    DocumentReady_Footer();
}

/*
 * Shows the cart when the Cart link on the header is clicked and calls the RefreshCart function
 */
function ShowCart() {
    var cart = $("#divCartPlaceHolder");

    cart.show();

    cart.affix({
        offset: {
            top: 0,
            right: 0
        }
    });

    RefreshCart();
}

/*
 * Hides the cart when the close button is used
 */
function HideCart() {
    $("#divCartPlaceHolder").hide();
}

/*
 * Refreshes the cart from the server using an ajax call to hit the Index action method on the Cart controller
 * The cart, header and next buttons are updated on successful completion of the ajax call
 * 
 * The flag refreshHeader is used as this function sis called from locations that do not want to refresh the header
 */
// ReSharper disable once UnusedParameter
function RefreshCart(refreshHeader) {
    $.ajax({
        url: "/Cart/Index",
        cache: false
    })
        .fail(function (jqXHR, textStatus) {
            HandleAjaxError(jqXHR, textStatus);
        })
        .done(function (data, refreshHeader) {

            // If we get a session error view back
            if ($(data).find("#sessionTimeout").length > 0) {
                HandleSessionTimeout(data);                
            } else {
                $("#divCart").html(data);

                if (refreshHeader) {
                    RefreshHeader();
                }

                RefreshOperationNextButton();
            }
        });
}

/*
 * Refresh the Next button on the operation view [Change Address Partial View | Instruction Partial View]
 * Shows or hides the button based on the amount of items in the cart
 * 
 * This is also used for the PickAddress form
 */
function RefreshOperationNextButton() {

    // If we are on the pick address page the buttons will be displayed using different rules
    if ($("#frmPickAddress").length > 0) {
        if ($("input[name=addressSuggestion]:checked").length !== 0) {
            $("#btnChangeAddressNext").css("visibility", "visible");
        } else {
            $("#btnChangeAddressNext").css("visibility", "hidden");
        }
    } else {
        if ($("div[name = divCartContainer]").children("div[name = divCartOffer]").length === 0) {
            $("#btnChangeAddressNext").css("visibility", "hidden");
            $("#btnInstructionNext").css("visibility", "hidden");
        } else {
            $("#btnChangeAddressNext").css("visibility", "visible");
            $("#btnInstructionNext").css("visibility", "visible");
        }
    }
}

/*
 * Refreshes the header from the server using an ajax call to hit the Index action method of the header controller
 * This stores the value indicating whether the cart was visible or not, this is used to [Show | Hide] the cart when the ajax call completes
 * This will apply the header styles
 *
 * This will wire up the Remove From Cart links [IN THE CART VIEW] 
 */
function RefreshHeader() {
    $.ajax({
        url: "/Header/Index",
        cache: false,
        data: { cartVisilble: $("#divCartPlaceHolder").is(":visible") }
    })
        .fail(function (jqXHR, textStatus) {
            HandleAjaxError(jqXHR, textStatus);
        })
        .done(function (data) {
            $("#divMasterHeader").html(data);
            ApplyHeaderStyles($("#divProgress").data("step"));
            WireRemoveFromCartLinks();
        });
}

/*
 * Wires up the remove from cart links for the offers in the cart
 * This expects a json object returned
 *
 * Mode 1
 * If the user has ordered, i.e. they are on the [Schedule | Confirmation] pages the remove from cart link will be wired to a popup
 * indicating that the offer has been ordered and cannot be removed.
 * This calls the CartSchedule action method on the Cart controller
 * 
 * Mode 2
 * If the user has yet to order, the item will be removed from the cart.
 * The RemoveOfferFromCart action method on the Cart controler will be called
 *
 * On the successful return of this ajax call the cart will be refreshed in all cases
 *
 * If there are no items left in the cart and the user is not on the select offers screen a popup will appear forcing the user to either 
 * Start Over or Change Order
 * 
 * If the user is on the [Verify | Customize] form that form will be refreshed, the cart will also be refreshed, in this case the cart refresh function will not refresh the header
 *
 * If the user is on the select offers screen, the offer links will be toggled based on the offer removed from the cart
 */
function WireRemoveFromCartLinks() {
    $("a[name = removeOfferFromCart]").click(function (e) {

        e.preventDefault();

        if ($("#frmSchedule").length > 0 || $("#frmConfirmation").length > 0) {
            $.ajax({
                url: "/Cart/CartSchedule", // We override the href path here
                cache: false
            })
                .fail(function (jqXHR, textStatus) {
                    HandleAjaxError(jqXHR, textStatus);
                })
                .done(function (data) {
                    $("#divCartSchedule").html(data);
                    $("#modalCartSchedule").modal("show");
                });

        } else {
            $.ajax({
                url: $(this).attr("href"),
                method: "POST",
                cache: false,
                data: { offerId: $(this).attr("id").replace("aRemoveOffer-", "") },
                dataType: "json"
            })
                .fail(function (jqXHR, textStatus) {
                    HandleAjaxError(jqXHR, textStatus);
                })
                .done(function (data) {

                    // If we are not on the select offers page and we remove all the offers from the cart
                    if (!$("#frmOffers").length > 0 && data.cartHasNoItems) {
                        RefreshCart(true); //Passing true will refresh the header
                        DisplayStartOver();
                    }
                    // If we are on the select form, toggle the offer cards
                    else if ($("#frmOffers").length > 0) {
                        RefreshCart(true); //Passing true will refresh the header                        
                        ToggleOffersOfSimilarType(data, true); // Passing true enables the adding of offers of similar type to the cart
                    }
                    // If we are on the schedule form and there are still offers in the cart we need to refresh the page
                    else if ($("#frmVerify").length > 0 && !data.cartHasNoItems) {
                        RefreshCart(false); //Passing false not will refresh the header, the main form will handle this
                        RefreshForm("Verify", "Index", "frmVerify");
                    }
                    // If we are on the customize form and there are still offers in the cart we need to refresh the page
                    else if ($("#frmCustomize").length > 0 && !data.cartHasNoItems) {
                        RefreshCart(false); //Passing false not will refresh the header, the main form will handle this
                        RefreshForm("Customize", "Index", "frmCustomize");
                    }
                    else {
                        RefreshCart(true); //Passing true will refresh the header
                    }

                    var addToCartLink = $("#addOffer-" + data.currentOfferId);

                    // True means enable
                    ToggleOfferLink(addToCartLink, true, true);
                });
        }
    });
}

/*
 * Uses an ajax GET request to get the controller and action method passed in
 * This pulls the form specified by the myform variable from the ajax response and replaces the corresponding form on the page
 * with itself
 */
function RefreshForm(controller, action, myform) {
    $.ajax({
        url: "/" + controller + "/" + action,
        method: "GET",
        cache: false
        //success: function(data) { RefreshMainForm(data, myform); }
    })
        .fail(function (jqXHR, textStatus) {
            HandleAjaxError(jqXHR, textStatus);
        })
        .done(function(data) {
            RefreshMainForm(data, myform);
        });
}

/*
 * Refreshes the main form html from the data variable
 */
function RefreshMainForm(data, formName) {
    
    var formData = $(data).find("#" + formName);

    $("#" + formName).html(formData);
}

/*
 * Refreshes the main HTML document
 */
function RefreshDocument(data, containerName) {

    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(data, "text/html");
    var bodyData = $(htmlDoc).find("#" + containerName);

    $("#" + containerName).html(bodyData);
}

/*
 * Wires up the add to cart links
 * Uses an ajax call to hit the AddToCart action method on the Cart controller
 *
 * The link what was clicked contains the offer id which is sent to the server
 * On successful return of the ajax call, offers of similar type are toggled of and the Cart Confirmation modal is displayed
 *
 * The cliecked offer link is also toggled off
 */
function WireAddToCartLinks() {

    $("a[data-locator-name='addOfferToCart']").click(function (e) {
        e.preventDefault();
        
        $.ajax({
            url: $(this).attr("href"),
            method: "POST",
            cache: false,
            data: { offerId: $(this).attr("id").replace("addOffer-", "") }
        })
            .fail(function (jqXHR, textStatus) {
                HandleAjaxError(jqXHR, textStatus);
            })
            .done(function (data) {

                // If we get a session error view back
                if ($(data).find("#sessionTimeout").length > 0) {
                    HandleSessionTimeout(data);
                } else {
                    // Passing false disables the adding of offers of similar type to the cart
                    ToggleOffersOfSimilarType(data, false);
                    DisplayAddToCartConfirmation();

                    var cartObjectLink = $.find("#addOffer-" + data.currentOfferId);

                    // False means disable
                    ToggleOfferLink(cartObjectLink, false, true);
                }                
            });               
    });
}

/*
 * Uses an ajax GET call to the CartAddConfirmation action method on the Cart controller
 * On the successful completion of the ajax call the cart and header are refreshed and the popup is displayed
 */
function DisplayAddToCartConfirmation() {
    $.ajax({
        url: "/Cart/CartAddConfirmation",
        cache: false
    })
        .fail(function (jqXHR, textStatus) {
            HandleAjaxError(jqXHR, textStatus);
        })
        .done(function (data) {
            $("#divCartAddConfirmation").html(data);
            $("#modalCartAddConfirmation").modal("show");
            RefreshCart(true); // Passing true will refresh the header
        });
}

/*
 * Uses and ajax GET call to the CartEmptied action method on the Cart controller
 * On the successful completion of the ajax call the modal will be displayed
 */
function DisplayStartOver() {
    $.ajax({
        url: "/Cart/CartEmptied",
        cache: false
    })
        .fail(function (jqXHR, textStatus) {
            HandleAjaxError(jqXHR, textStatus);
        })
        .done(function (data) {
            $("#divCartEmptied").html(data);
            $("#modalCartEmptied").modal("show");
        });
}
