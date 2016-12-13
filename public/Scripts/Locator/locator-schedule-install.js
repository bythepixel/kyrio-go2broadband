// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

/* ========================================================================
 * Schedule Install LOGIC
 * ========================================================================
 * 
 * 3rd Party Tool Used - http://eonasdan.github.io/bootstrap-datetimepicker/
 * ======================================================================== */
function DocumentReady_Schedule() {
    WireUpScheduleInstallCalanders();

    WireUpScheduleInstallTimeSlots();

    PopulateUserSelectedPreferences();
}

/*
 * Used when the selected date is changed
 * This function will deselected the timeslot for the previous date and hide the timeslot control
 * It will then display the timeslot associated with the active date and set the selected value to the default
 */
function DatePickerChangeEvent(activeDate, previousDate, id, guid) {

    var container = $("#" + id + "-Container[data-locator-correlation-guid='" + guid + "']");

    ApplyStylesToDateTimePicker($(container));

    $(container).find("[data-locator-time-group='locator-time-group']>select").attr("disabled", true);
    $(container).find("[data-locator-time-group='locator-time-group']").hide();

    FreeUpSelectedTimeSlotsForDeselectedDate(previousDate, id, guid);

    $(container).find("#" + activeDate + ">select").attr("disabled", false);
    $(container).find("#" + activeDate).show();
    
    // Another hack - When the day changes, set the hidden value to null rather than keeping the last value
    $(container).find("#" + activeDate + ">select").val("0");

    // Wire up the drop downs to write to the hidden field
    $(container).find("#" + activeDate + ">select")
        .on("change", function () {
            $(container).find("[data-locator-name='installPreference']").val(this.value);
        });
}

/*
 * Used when the timeslot is changed
 * This function will free up the previously selected option value for the timeslot so that it is available for the other preferences
 * It will then lock the selected timeslot value so it cannot be selected in another install preference
 */
function TimeSlotChangeEvent(timeSlotSelect, selectTimeSlotDivId, offerId, serviceLineId, guid) {
    // Get the original value
    var selectPreviousOptionValue = $(timeSlotSelect).data("pre");    
    
    if (selectPreviousOptionValue) {
        ToggleTimeSlotsStyles(selectPreviousOptionValue, selectTimeSlotDivId, offerId, serviceLineId, guid, true);
    }
    
    var selectedOptionValue = $(timeSlotSelect).find("option:selected").val();

    // Update the pre data
    $(timeSlotSelect).data("pre", selectedOptionValue);

    ToggleTimeSlotsStyles(selectedOptionValue, selectTimeSlotDivId, offerId, serviceLineId, guid, false);
}

/*
 * Convert a date to the format MM/dd/yyyy
 */
function GetDateAsString(container, dateToConvert) {

    // Previous date works fine here becuase it's in the format MM/dd/yyyy
    // Active date doesn't work becuase it comes across as a string
    var convertedDate;

    if (dateToConvert.date) {
        convertedDate = (dateToConvert.date._d.getMonth() + 1).toString();
        convertedDate += dateToConvert.date._d.getDate().toString();
        convertedDate += dateToConvert.date._d.getFullYear().toString();
    } else {
        var tempDate = new Date(dateToConvert);
        convertedDate = (tempDate.getMonth() + 1).toString();
        convertedDate += tempDate.getDate().toString();
        convertedDate += tempDate.getFullYear().toString();
    }    

    return convertedDate;    
}

/*
 * Populates the timeslots for the selected dates
 */
function PopulateUserSelectedPreferences() {

    $("div").find("[data-locator-name='dtpSchedule']")
        .each(function () {

            var container = $(this).closest("div[data-locator-container]");

            var installPreference = $(container).find("[data-locator-name='installPreference']").val();

            if (installPreference) {

                var activeDate = $(container).find("select option[value='" + installPreference + "']").closest("div[data-locator-time-id]").attr("data-locator-time-date");
                var activeInstallDate = GetDateAsString(container, activeDate);
                
                $(container).find("div[data-locator-name = 'dtpSchedule']").data("DateTimePicker").date(activeDate);

                var guid = $(container).attr("data-locator-correlation-guid");

                var id = $(container).attr("id");
                id = id.substring(0, id.lastIndexOf("-"));

                var previousInstallDate = GetDateAsString(container, $(container).find("div[data-locator-min-selectable-date]").attr("data-locator-min-selectable-date"));                
                DatePickerChangeEvent(activeInstallDate, previousInstallDate, id, guid);
                
                $(container).find("select option:selected").removeAttr("selected");
                var timeSlotOption = $(container).find("select option[value='" + installPreference + "']");

                timeSlotOption.prop("selected", "selected");

                var timeSlotSelect = $(timeSlotOption).closest("select");
                var selectTimeSlotDivId = $(timeSlotSelect).closest("div[data-locator-time-id]").attr("data-locator-time-id");

                var offerId = $(container).closest("div[data-locator-offer-id]").attr("data-locator-offer-id");
                var serviceLineId = $(container).closest("div[data-locator-offer-id]").attr("data-locator-service-line-id");

                TimeSlotChangeEvent(timeSlotSelect, selectTimeSlotDivId, offerId, serviceLineId, guid);
            }
        });
}

/*
 * Setup the initial disaply for the calanders and time slots
 * Wire up the drop downs to write to a hidden field
 * Disable and hide all the time slots to start with
 * Show the intial time slot - This will be the time slot for the selected date on the calander
 */
function InitialDisplay(minSelectableDate, id, guid) {

    /////////////////////////////////////////////////
    /// START - EXTRA BECAUSE OF MVC BINDING     
    /////////////////////////////////////////////////
    
    var msd = new Date(minSelectableDate);

    var ad = (msd.getMonth() + 1).toString();
    ad += msd.getDate().toString();
    ad += msd.getFullYear().toString();
    
    var container = $("#" + id + "-Container[data-locator-correlation-guid='"+ guid + "']");

    // Wire up the drop downs to write to the hidden field
    $(container).find("#" + ad + ">select")
        .on("change", function () {
            $(container).find("[data-locator-name='installPreference']").val(this.value);
        });

    // Disable everything to start with
    $(container).find("[data-locator-time-group='locator-time-group']>select").attr("disabled", true);
    $(container).find("[data-locator-time-group='locator-time-group']").hide();

    // Show the initial time slot
    $(container).find("#" + ad + ">select").attr("disabled", false);
    $(container).find("#" + ad).show();
   
    /////////////////////////////////////////////////
    /// END - EXTRA BECAUSE OF MVC BINDING            
    /////////////////////////////////////////////////
}

/*
 * Updates the display with the selected time slot
 */
function UpdateDisplayWithSelectedInstallWindow(id, guid) {

    var scheduledDate = $("#" + id + "[data-locator-correlation-guid='" + guid + "']").data("DateTimePicker").date();    

    var activeDate = (scheduledDate._d.getMonth() + 1).toString();
    activeDate += scheduledDate._d.getDate().toString(); 
    activeDate += scheduledDate._d.getFullYear().toString();
    
    var date = scheduledDate._d.toLocaleDateString();
    var time = $("#" + id + "-Container[data-locator-correlation-guid='" + guid + "']").find("#" + activeDate + ">select option:selected").text();

    $("#" + id + "-Complete[data-locator-correlation-guid='" + guid + "']").find("span[data-locator-install='date']").text(date);
    $("#" + id + "-Complete[data-locator-correlation-guid='" + guid + "']").find("span[data-locator-install='time']").text(time);
}

/*
 * Toggles the time slot option styles
 */
function HandleToggleOfTimeSlot(e, selectedOption, enable) {

    var option = $(e).find("select").find("option[value='" + selectedOption + "']");

    if (enable) {        
        if ($(option).hasClass("locator-time-slot-selected")) {
            $(option).removeClass("locator-time-slot-selected");
        } else {
            $(option).attr("disabled", false);
            $(option).removeClass("locator-time-slot-disabled");
        }
    } else if (selectedOption !== "0") {        
        if ($(option).is(":selected")) {
            $(option).addClass("locator-time-slot-selected");
        } else {
            $(option).attr("disabled", true);
            $(option).addClass("locator-time-slot-disabled");
        }
    }    
}

/*
 * Finds the TimeSlots to toggle based on the [Offer Id & Service Line Id & Time Slot Selected]
 */
function ToggleTimeSlotsStyles(selectedOption, selectTimeSlotDivId, offerId, serviceLineId, guid, enable) {

    var search;

    if (offerId) {
        search = "div[data-locator-offer-id = '" + offerId + "'][data-locator-correlation-guid='" + guid + "']";
    }

    if (serviceLineId) {
        if (search) {
            search += "[data-locator-service-line-id = '" + serviceLineId + "']";
        } else {
            search = "div[data-locator-service-line-id = '" + serviceLineId + "']";
        }
    }

    if (search) {
        $(search).find("div[data-locator-time-id='" + selectTimeSlotDivId + "']").each(function() {
            HandleToggleOfTimeSlot(this, selectedOption, enable);
        });
    } else {
        $("div[data-locator-time-id='" + selectTimeSlotDivId + "']").each(function () {
            HandleToggleOfTimeSlot(this, selectedOption, enable);
        });
    }   
}

/*
 * Wires up the Time Slot drop down to store the previous value in a hidden field
 * When the drop down is changed the previous value will be updated as well as the applied styles
 * The previous value is used to toggle the select option styles
 *
 * This is applied to all associated time slots [1st | 2nd | 3rd] install preferences
 */
function WireUpScheduleInstallTimeSlots() {
    
    $("div").find("[data-locator-time-group='locator-time-group']")
        .each(function () {

            var select = $(this).find("select");

            $(select).removeAttr("multiple");

            // Assign the previous value to a data field so we can re-enable time slots
            $(select).data("pre", $(select).val());

            $(select).change({
                selectTimeSlotDivId: $(this).attr("data-locator-time-id"),
                guid: $(this).closest("#divCalanders").attr("data-locator-correlation-guid"),
                offerId: $(this).closest("#divCalanders").attr("data-locator-offer-id"),
                serviceLineId: $(this).closest("#divCalanders").attr("data-locator-service-line-id")
            }, function (e) {                
                TimeSlotChangeEvent($(this), e.data.selectTimeSlotDivId, e.data.offerId, e.data.serviceLineId, e.data.guid);
            });
        });
}

/*
 * Frees up the selected time slot for the date that has changed.
 * This resets the time slot selected value to the default for the date that changed
 */
function FreeUpSelectedTimeSlotsForDeselectedDate(previousDate, id, guid) {

    var container = $("#" + id + "-Container[data-locator-correlation-guid='" + guid + "']");

    var previousDateSelectedTimeSlotOption = $(container).find("#" + previousDate + ">select>option:selected");

    var previousSelectControl = $(container).find("#" + previousDate + ">select");
    var previousDateSelectedTimeSlotOptionValue = $(previousSelectControl).data("pre");

    // Set the value to 0 which will be the "Please Select a Time Slot" option
    $(previousSelectControl).attr("pre", null);

    var selectTimeSlotDivId = $(container).find("#" + previousDate).attr("data-locator-time-id");
    var offerId = $(previousDateSelectedTimeSlotOption).closest("#divCalanders").attr("data-locator-offer-id");
    var serviceLineId = $(previousDateSelectedTimeSlotOption).closest("#divCalanders").attr("data-locator-service-line-id");

    ToggleTimeSlotsStyles(previousDateSelectedTimeSlotOptionValue, selectTimeSlotDivId, offerId, serviceLineId, guid, true);
}

/* 
 * Wires up the calanders for the view, this makes used of data attributes to hold the [Min & Max & Enabled] dates from the model
 * Wires up the change event to update the time slot dropdown
 * Sets the initial date to the min selectable date and shows the calander
 */
function WireUpScheduleInstallCalanders() {
   
    $("div").find("[data-locator-name='dtpSchedule']")
        .each(function () {

            var id = $(this).attr("id");
            var guid = $(this).attr("data-locator-correlation-guid");
            var enabledDates = $(this).data("locator-enabled-dates");
            var minSelectableDate = $(this).data("locator-min-selectable-date");
            var maxSelectableDate = $(this).data("locator-max-selectable-date");

            var arrayEnabledDates = enabledDates.split(",");

            InitialDisplay(minSelectableDate, id, guid);

            $("#" + id + "[data-locator-correlation-guid='" + guid + "']").datetimepicker({
                    keepOpen: true,
                    allowInputToggle: true,
                    format: "MM/DD/YYYY",
                    ignoreReadonly: true,
                    minDate: minSelectableDate,
                    maxDate: maxSelectableDate,
                    showClear: true,
                    showClose: true,
                    enabledDates: arrayEnabledDates,
                    defaultDate: minSelectableDate,
                    debug: true, //This will keep the calander open
                    widgetPositioning: {
                        horizontal: "auto",
                        vertical: "bottom"
                    }
                })
                .on("dp.change", function (e) {

                    var activeDate = (e.date._d.getMonth() + 1).toString();
                    activeDate += e.date._d.getDate().toString();
                    activeDate += e.date._d.getFullYear().toString();

                    var previousDate = (e.oldDate._d.getMonth() + 1).toString();
                    previousDate += e.oldDate._d.getDate().toString();
                    previousDate += e.oldDate._d.getFullYear().toString();

                    DatePickerChangeEvent(activeDate, previousDate, id, guid);
                })
                .on("dp.show", function() {
                    if (!$("#" + id + "[data-locator-correlation-guid='" + guid + "']").hasClass("locator-schedule-calander-spacer")) {
                        $("#" + id + "[data-locator-correlation-guid='" + guid + "']").addClass("locator-schedule-calander-spacer");
                    }
                    ApplyStylesToDateTimePicker($(this));
                })
                .on("dp.hide", function() {
                    if ($("#" + id + "[data-locator-correlation-guid='" + guid + "']").hasClass("locator-schedule-calander-spacer")) {
                        $("#" + id + "[data-locator-correlation-guid='" + guid + "']").removeClass("locator-schedule-calander-spacer");
                    }
                })
                .on("dp.update", function() {
                    ApplyStylesToDateTimePicker($(this));
                });
                
            // Max enabled date will override the current or default date for some reason
            $("#" + id + "[data-locator-correlation-guid='" + guid + "']").data("DateTimePicker").date(minSelectableDate);            

            $("#" + id + "[data-locator-correlation-guid='" + guid + "']").data("DateTimePicker").show();            
        });    
}
