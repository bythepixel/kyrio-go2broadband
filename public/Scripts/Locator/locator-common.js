// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

// ReSharper disable InconsistentNaming

/* ========================================================================
 * Shared LOGIC
 * ========================================================================
 *
 * ======================================================================== */
function PopulateShippingAddress() {
    $.ajax({
        url: "/Setup/PopulateShippingAddress",
        cache: false,
        method: "POST",        
        dataType: "json"
    })
       .fail(function (jqXHR, textStatus) {
           HandleAjaxError(jqXHR, textStatus);
       })
       .done(function (data) {
           
           if (data.status === "Success") {
               $("#streetAddress").val(data.streetAddress);
               $("#suite").val(data.suite);
               $("#city").val(data.city);
               $("#selServiceAddressState").val(data.state);               
               $("#zip").val(data.zip);
           }
        });
}

function PopulateCreditCardBillingAddress() {
    var formName = "";

    if ($("#frmAuthenticate").length > 0) {
        formName = "authenticate";
    }
    else if ($("#frmSubmitOrder").length > 0) {
        formName = "order";
    }
    else if ($("#frmVerify").length > 0) {
        formName = "order";
    }

    $.ajax({
        url: "/Setup/PopulateCreditCardBillingAddress",
        cache: false,
        method: "POST",
        dataType: "json",
        data: { requestingForm : formName}
    })
      .fail(function (jqXHR, textStatus) {
          HandleAjaxError(jqXHR, textStatus);
      })
      .done(function (data) {

          if (data.status === "Success") {
              $("#billing_streetAddress").val(data.streetAddress);
              $("#billing_suite").val(data.suite);
              $("#billing_city").val(data.city);
              $("#billing_selServiceAddressState").val(data.state);
              $("#billing_zip").val(data.zip);
          }
      });
}

function PopulateServiceAddress() {
    $.ajax({
        url: "/Setup/PopulateServiceAddress",
        cache: false,
        method: "POST",
        dataType: "json"
    })
      .fail(function (jqXHR, textStatus) {
          HandleAjaxError(jqXHR, textStatus);
      })
      .done(function (data) {

          if (data.status === "Success") {
              $("#streetAddress").val(data.streetAddress);
              $("#suite").val(data.suite);
              $("#city").val(data.city);
              $("#selServiceAddressState").val(data.state);
              $("#zip").val(data.zip);
          }
      });
}

/*
 * Return the form [Submit Order | Verify ] 
 */
function GetLocatorForm() {
    var locatorForm = null;

    if ($("#frmSubmitOrder").length > 0) {
        locatorForm = $("#frmSubmitOrder");
    } else if ($("#frmVerify").length > 0) {
        locatorForm = $("#frmVerify");
    }

    return locatorForm;
}

function CheckFieldIfPopulated(field) {

    var locatorForm = GetLocatorForm();

    var fieldElement = locatorForm.find(':input[id="' + field + '"]')[0];
    if (fieldElement) {
        var fieldValue = fieldElement.value;
        if (fieldValue)
            return true;
    }
    return false;
}

function SetAddressFieldsRequired(hiddenfield, prefix) {

    var locatorForm = GetLocatorForm();

    var hiddenElement = locatorForm.find(':input[id="' + hiddenfield + '"]')[0];
    if (hiddenElement) {
        var fields = ["streetAddress", "city", "zip", "suite", "selServiceAddressState"];
        var i, len = fields.length;
        for (i = 0; i < len; ++i) {
            if (i in fields) {
                var fieldToCheck = prefix + fields[i];
                if (CheckFieldIfPopulated(fieldToCheck)) {
                    hiddenElement.value = "True";
                    return;
                }
            }
        }
        hiddenElement.value = "False";
    }
}

function SetCreditCardFieldsRequired() {

    var locatorForm = GetLocatorForm();

    var hiddenElement = locatorForm.find(':input[id="creditCardConditionalRequired"]')[0];
    if (hiddenElement) {

        // Hooks up credit card address to credit card validation
        var prefix = "billing_";
        var fields = ["nameOnCard", "selCardType", "cardNumber", "securityCode", "selCreditCardServiceExpirationMonths", "selCreditCardServiceExpirationYear", prefix + "streetAddress", prefix + "city", prefix + "suite", prefix + "selServiceAddressState", prefix + "zip"];        
        //var fields = ["nameOnCard", "selCardType", "cardNumber", "selCreditCardServiceExpirationMonths", "selCreditCardServiceExpirationYear", "billingPhone"];

        var i, len = fields.length;
        for (i = 0; i < len; ++i) {
            if (i in fields) {
                var fieldToCheck = fields[i];
                if (CheckFieldIfPopulated(fieldToCheck)) {
                    hiddenElement.value = "True";

                    // Hooks up credit card address to credit card validation
                    // TODO: Do we require the use to enter a credit card address if they are entering a credit card?
                    //$("#billing_serviceAddressConditionalRequired").val("True");

                    return;
                }
            }
        }

        hiddenElement.value = "False";

        // Hooks up credit card address to credit card validation
        //$("#billing_serviceAddressConditionalRequired").val("False");
    }
}

/*
 * Masks the element defined by the field variable
 *
 * Masks the security code on the [Authenticate | Submit Order | Verify ] page by changing the input type to password.
 * This will also add an on focus event that will change the input back to text if the users is editing
 *
 * Masks the credit card numberon the [Authenticate | Submit Order | Verify ] page by changing the input type to password.
 * This will also add an on focus event that will change the input back to text if the users is editing
 */
function MaskField(field) {

    var fieldToMask = $("#" + field);

    if (fieldToMask.length > 0) {

        fieldToMask.on("blur", function () {
            fieldToMask.prop("type", "password");
        });

        fieldToMask.on("focus", function () {

            if ($("#frmVerify").length > 0) {
                var editInforamtion = $("#btnEditInformation").data("edit");
                var isEditSet = (editInforamtion === true);

                if (!isEditSet) {
                    fieldToMask.val("");
                    fieldToMask.prop("type", "text");                    
                    SetCreditCardFieldsRequired();
                }
            } else {
                fieldToMask.val("");
                fieldToMask.prop("type", "text");                
                SetCreditCardFieldsRequired();
            }
        });

        if (fieldToMask.val().length > 0) {
            fieldToMask.prop("type", "password");
        }
    }
}

/*
 * Changes the credit card type drop down based on the credit card number
 * Credit card qualifiers updated since Legacy Locator was implemented
 *
 * Credit card validation from Legacy Locator
 * "4\d{15}|5[1-5]\d{14}|6011\d{12}|3[4,7]\d{13}|3[0,6,8]\d{12}"
 */
function SetCreditCardType() {

    var cardNumberElement = $("#cardNumber");    

    if (cardNumberElement.length > 0) {

        cardNumberElement.on("keyup", function() {
            var selCardType = $("#selCardType");

            var cardNumber = $(this).val();

            var visaQualifiers = ["4"];
            var mastercardQualifiers = ["51", "52", "53", "54", "55"];
            var amexQualifiers = ["34", "37"];
            var dinersQualifiers1 = ["300", "301", "302", "303", "304", "305"];
            var dinersQualifiers2 = ["36", "38"];
            var discoverQualifiers = ["6011"];

            var visaCheck = cardNumber.substring(0, 1);
            var mastercardCheck = cardNumber.substring(0, 2);
            var amexCheck = cardNumber.substring(0, 2);
            var dinersCheck1 = cardNumber.substring(0, 3);
            var dinersCheck2 = cardNumber.substring(0, 2);
            var discoverCheck = cardNumber.substring(0, 4);

            if ($.inArray(visaCheck, visaQualifiers) > -1) {
                selCardType.val("Visa");
            } else if ($.inArray(mastercardCheck, mastercardQualifiers) > -1) {
                selCardType.val("MC");
            } else if ($.inArray(amexCheck, amexQualifiers) > -1) {
                selCardType.val("Amex");
            } else if ($.inArray(dinersCheck1, dinersQualifiers1) > -1) {
                selCardType.val("Diners");
            } else if ($.inArray(dinersCheck2, dinersQualifiers2) > -1) {
                selCardType.val("Diners");
            } else if ($.inArray(discoverCheck, discoverQualifiers) > -1) {
                selCardType.val("Discover");
            } else {
                selCardType.val("");
            }
        });
    }    
}
