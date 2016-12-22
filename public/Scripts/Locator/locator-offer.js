// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

/* ========================================================================
 * Offer Card Details LOGIC
 * ========================================================================
 * 
 * ======================================================================== */
function DocumentReady_Select() {
    ToggleOffersOnLoad();

    PrepareCompareOffers();

    SetAnchorLinkColor();
}

/*
 * Set the anchor tag color in the Offer Details div
 * This is to override the default color for anchor tags which is not visible with the blue background
 * Anchor tags are created from the message information recieved from core
 */
function SetAnchorLinkColor() {

    var offerDetails = $.find("div[name=divOfferDetailsMain]");

    if (offerDetails) {

        for (var index = 0; index < offerDetails.length; index ++) {

            $(offerDetails[index]).find("a").each(function () {
                if (!$(this).hasClass("locator-offer-details-link")) {
                    $(this).addClass("locator-offer-details-link");
                }
            });   
        }        
    }
}

/*
 * Hides the other offer cards when the View Details is clicked ed on an offer card
 */
function HideOtherOfferCards(activeOfferId) {

    // Hide and switch back to default for all offers but the one selected
    $(".locator-offer-details-arrow").hide();
    $("div[name=offerDetails]").hide();
    
    $("[name = aViewDetails]").each(function () {
        $(this).show();
    });
    $("[name = aCloseDetails]").each(function () {
        $(this).hide();
    });

    // Toggle the current offer details
    $("#offerDetailsArrow-" + activeOfferId).toggle();
    $("#collapseOfferDetail-" + activeOfferId).show();

    $("#offerCard-" + activeOfferId).find("[name = aViewDetails]").hide();
    $("#offerCard-" + activeOfferId).find("[name = aCloseDetails]").show();
}

/*
 * Hides the offer details when the close button is clickec
 */
function HideOfferCard(offerDetailsDivId) {
    $("#offerDetailsArrow-" + offerDetailsDivId).hide();
    $("#collapseOfferDetail-" + offerDetailsDivId).hide();

    $("#offerCard-" + offerDetailsDivId).find("[name = aViewDetails]").show();
    $("#offerCard-" + offerDetailsDivId).find("[name = aCloseDetails]").hide();
}

/*
 * Toggle [Add | Remove] links for offers of similar type [On | Off]
 *
 * Data contains a string of offers id's to toggle aswel as the current offer
 * enableOffer is a bool value
 */
function ToggleOffersOfSimilarType(data, enableOffers) {
    if (data) {
        var offerIdList = data.offersIdsToToggle.split(",");

        for (var index = 0; index < offerIdList.length; index++) {
            if (offerIdList[index] === data.currentOfferId) {
                ToggleOfferLink($("#addOffer-" + offerIdList[index]), enableOffers, true);
            } else {
                ToggleOfferLink($("#addOffer-" + offerIdList[index]), enableOffers, false);
            }
        }
    }
}

/*
 * Toggles the offer link [On | Off], changes the link text, and styles
 */
function ToggleOfferLink(link, enable, currentOffer) {

    //TODO: Add a check for each class before either adding or removing it
    //TODO: hopefully then we will not have to use jquery syntax on every variable
    if (enable) {
        $(link).removeClass("locator-cursor-disable locator-link-disabled");
        $(link).parent().removeClass("locator-cursor-disable locator-link-disabled");
        $(link).attr("disabled", false);

        $(link).text("ADD TO CART");

        if (currentOffer) {
            $(link).parent().removeClass("locator-offer-card-add-to-cart-current");
            $(link).removeClass("locator-offer-card-add-to-cart-current-anchor");
        } else {
            $(link).parent().removeClass("locator-offer-card-add-to-cart-disabled");
        }
    } else {
        $(link).addClass("locator-cursor-disable locator-link-disabled");
        $(link).parent().addClass("locator-cursor-disable");
        $(link).attr("disabled", true);

        if (currentOffer) {
            $(link).text("ALREADY IN CART");
            $(link).parent().addClass("locator-offer-card-add-to-cart-current");
            $(link).addClass("locator-offer-card-add-to-cart-current-anchor");
        } else {
            $(link).text("CANNOT ADD THIS");
            $(link).parent().addClass("locator-offer-card-add-to-cart-disabled");
        }
    }
}

/*
 * Toggles the offers when the page is loaded. 
 * This is used then the customer returns to the offer selection view with offers in the cart
 *
 * This makes use of Offer Model properties and data attributes 
 */
function ToggleOffersOnLoad() {

    $("a[data-locator-name='addOfferToCart']").each(function () {

        var offerInCart = $(this).attr("data-locator-offer-in-cart");

        if (offerInCart && offerInCart.toLowerCase() === "true") {
            var offersIdsToToggle = $(this).attr("data-locator-offers-effected");
            var currentOfferId = $(this).attr("id").substring($(this).attr("id").indexOf("-") + 1);

            var updatedOffersIdsToToggle = RemoveCurrentOffersFromToggleIds(offersIdsToToggle, currentOfferId);

            var data = {};
            data.offersIdsToToggle = updatedOffersIdsToToggle;
            data.currentOfferId = $(this).attr("id").substring($(this).attr("id").indexOf("-") + 1);

            ToggleOffersOfSimilarType(data, false);
        }
    });
}

/*
 * Removes the current offer from the list of offers to toggle.
 * This stops the issue of subsequent offer toggling effecting the current state of toggled offers
 */
function RemoveCurrentOffersFromToggleIds(offersIdsToToggle, currentOfferId) {

    var currentOffers = [];

    $("a[data-locator-name='addOfferToCart'][data-locator-offer-in-cart='True']").each(function () {
        var cartOfferIds = $(this).attr("id").substring($(this).attr("id").indexOf("-") + 1);
        currentOffers.push(cartOfferIds);
    });

    var offerIdList = offersIdsToToggle.split(",");

    var updatedOffersIdsToToggle = offerIdList;

    for (var index = 0; index <= currentOffers.length; index++) {

        // If it exists it's a current offer
        if (offerIdList.indexOf(currentOffers[index]) > -1 && offerIdList[offerIdList.indexOf(currentOffers[index])] !== currentOfferId) {
            updatedOffersIdsToToggle.splice(offerIdList.indexOf(currentOffers[index]), 1);
        }
    }

    return updatedOffersIdsToToggle.toString();
}

/*
 * Array extension method
 * This is not used as one of the third party tool might already have somthing like this
 */
//Array.prototype.contains = function (element) {
//    return this.indexOf(element) > -1;
//};

/* ========================================================================
 * Compare Offers LOGIC
 * ========================================================================
 * 
 * This logic is currently unused as the Compare functionality as not been completed
 * ======================================================================== */
function PrepareCompareOffers(compareType) {
    
    LimitOfferComparison(compareType);

    DisableOfferCrossComparison(compareType);

    RefreshOperationCompareButton();
}

/*
 * [Show | Hide] the compare offers button
 */
function RefreshOperationCompareButton() {
    if ($("div[name=divCompare]").find("input:checkbox:checked").length === 0) {
        $("#btnChangeAddressCompareOffers").hide();
    } else {
        $("#btnChangeAddressCompareOffers").show();
    }
}

/*
 * This method limits the customer to only compare 3 offers at a time
 */
function LimitOfferComparison(compareType) {
    var checkBox = $("div[name = divCompare ][data-compare-type = '" + compareType + "']");
    var numChecked = checkBox.find("input:checkbox:checked").length;

    if (numChecked === 3) {       
        checkBox.find("input:checkbox:unchecked").prop("disabled", true);
    }
    else if (numChecked < 3) {
        checkBox.find("input:checkbox:unchecked").prop("disabled", false);
    }
}

/*
 * This method limits the customer to only compare offers of similar type
 */
function DisableOfferCrossComparison(compareType) {

    var numChecked = $("div[name=divCompare]").find("input:checkbox:checked").length;
    
    // Re-enable all checkboxes
    if (numChecked === 0) {
        $("div[name = divCompare]").find("input:checkbox").prop("disabled", false);
    }
    // Disable all, none-like type check boxes
    else if (numChecked === 1) {
        $("div[name = divCompare][data-compare-type != '" + compareType + "']").find("input:checkbox").prop("disabled", true);
    }
}
