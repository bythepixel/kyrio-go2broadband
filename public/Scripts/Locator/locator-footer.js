// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

/* ========================================================================
 * Footer Modals Logic
 * ========================================================================
 * 
 * This handles the Privacy Information and Terms of Use modals
 * ======================================================================== */
function DocumentReady_Footer() {
    ExtendFooter();
    WireFooterModals();
}

/*
 * Wires up the footer modals for Terms of Use and Privacy Information
 */
function WireFooterModals() {

    // Link the Privacy anchor to the Privacy modal partial view
    $("#aPrivacy").click(function () {
        var url = $("#divPrivacy").data("url");

        $.get(url, function (data) {
            $("#divPrivacy").html(data);
            $("#modalPrivacy").modal("show");
        });
    });

    // Link the TermsOfUse anchor to the TermsOfUse modal partial view
    $("#aTermsOfUse").click(function () {
        var url = $("#divTermsOfUse").data("url");

        $.get(url, function (data) {
            $("#divTermsOfUse").html(data);
            $("#modalTermsOfUse").modal("show");
        });
    });
}

/*
 * Extends the footer to the bottom of the page by changing it's height based on the document height
 *
 * This could also possibly be done using divs and background colors since the issue is that under the footer there's
 * white space depending on the size of the form being loaded
 */
function ExtendFooter() {

    //If you are using jQuery, you can get the size of the window or the document using jQuery methods:

    //$(window).height();   // returns height of browser viewport
    //$(document).height(); // returns height of HTML document
    //$(window).width();   // returns width of browser viewport
    //$(document).width(); // returns width of HTML document
    //For screen size you can use the screen object in the following way:

    //screen.height;
    //screen.width;

    // This is the total vertical padding of the footer div
    //var footerPadding = 50;

    // No pixels from top of page that the footer starts
    var viewableTopOffset = $("#divFooter").offset().top - $(window).scrollTop();
    //var windowHeight = $(window).height();    
    var windowHeight = $(document).height(); //This may not work in all browsers

    // If the footer is pasted the viewable area
    if (windowHeight <= viewableTopOffset) return;
    //$("#divFooter").height(windowHeight - viewableTopOffset - footerPadding);
    $("#divFooter").height(windowHeight - viewableTopOffset);
}
