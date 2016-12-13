// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

// ReSharper disable InconsistentNaming

/* ========================================================================
 * Customize LOGIC
 * ========================================================================
 * 
 * ======================================================================== */
function DocumentReady_Customize() {
    WireUpCustomizeSelections();

    WireCustomizationAccordionsBehaviour();
}

/*
 * Wires up the changing of glyphicons to the show and hidden functions for the accordions
 * This changes the arrow between the right and down directions
 */
function WireCustomizationAccordionsBehaviour() {

    $(".collapse").on("show.bs.collapse", function () {
        $(this).parent().find(".glyphicon-triangle-right").removeClass("glyphicon-triangle-right").addClass("glyphicon-triangle-bottom");        
    });

    $(".collapse").on("hidden.bs.collapse", function () {
        $(this).parent().find(".glyphicon-triangle-bottom").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-right");       
    });
}

/*
 * This method wires up the [selection | desclection] of customizations to the Cart controller action method UpdateCustomizationsInCart
 * This will also call RefreshCart once the action method completes
 */
function WireUpCustomizeSelections() {
    $("#frmCustomize").find(":input").filter("[data-locator-choice-id]").each(function () {

        $(this).on("change", function () {

            $.ajax({
                url: "/Cart/UpdateCustomizationsInCart",
                method: "POST",
                cache: false,
                data: {                    
                    offerId: $(this).closest("div[data-locator-offer]").find("input[data-locator-offer-id='offerIdStore']").val(),                            
                    customizationId: $(this).closest("div[data-locator-customization]").find("input[data-locator-customization-id='customizationIdStore']").val(),                                    
                    choiceId: $(this).attr("data-locator-choice-id"),
                    isRadio: $(this).is(":radio")
                }
            })
                .fail(function (jqXHR, textStatus) {
                    HandleAjaxError(jqXHR, textStatus);
                })            
                .done(function () {
                    RefreshCart();
                });            
        });
    });
}

$("form").submit(function () {

    // checkbox/radio validation
    // http://stackoverflow.com/questions/11688692/most-elegant-way-to-create-a-list-of-unique-items-in-javascript
    function unique(a) {
        return a.sort(function (cb1, cb2) {
            if (cb1 > cb2) return 1;
            if (cb1 < cb2) return -1;
            return 0;
        }).filter(function (value, index, array) {
            return (index === 0) || (value !== array[index - 1]);
        });
    }

    var ids = [];
    var cbs = $("[data-locator-choice-id]");
    cbs.each(function (e) {
        // ReSharper disable once PossiblyUnassignedProperty
        if (cbs[e] != undefined) {
            ids.push($(this).attr("data-locator-customizationId"));
        }
    });

    if (ids.length === 0) return true;

    var multicheckboxes = unique(ids);

    var isValid = true;

    // ReSharper disable once MissingHasOwnPropertyInForeach
    for (var c in multicheckboxes) {
        var customizationId = multicheckboxes[c];

        var min = parseInt($("[data-locator-min='" + customizationId + "']").attr("value"));
        var max = parseInt($("[data-locator-max='" + customizationId + "']").attr("value"));

        // ReSharper disable once PossiblyUnassignedProperty
        var checked = $("[data-locator-customizationId='" + customizationId + "']:checked").length;

        var msg = $("[data-locator-validation-error='" + customizationId + "']");

        //var container = msg.data("locator-validation-error") + "-heading";

        if (checked < min || checked > max) {

            isValid = false;
            
            var errorText = "Please select between " + min + " and " + max + " options";
            if (min === max && min === 1) {
                errorText = "Please select 1 option";
            }
            msg.text(errorText);
            msg.show();

            //UpdateCustomizationHeader(container, true);
        } else {
            //UpdateCustomizationHeader(container, false);

            msg.hide();
        }
    }

    return isValid;
});

/*
 * This function will be used to change the color of the header pane of the collapse panels when there is a validation error
 */
function UpdateCustomizationHeader(element, hasError) {

    if (!$("#" + element).attr("data-locator-customization-header")) {        
    }

    if (hasError && hasError === true) {
        $("#" + element).removeClass("bg-primary");
        $("#" + element).addClass("bg-danger");
    } else {
        $("#" + element).removeClass("bg-danger");
        $("#" + element).addClass("bg-primary");
    }
}
