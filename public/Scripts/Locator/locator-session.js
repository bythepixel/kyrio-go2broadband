// This causes the ECMA parser to inforce the use of the var keyword when defining a variable
"use strict";

/* ========================================================================
 * Session LOGIC
 * ========================================================================
 * 
 * ======================================================================== */

//function SessionClearingEvents() {
//    var clientX = 0;
//    var clientY = 0;
//    var scheduled = false;

//    $(window).bind("mousemove", function(event) {
//        if (!scheduled) {
//            scheduled = true;
//            setTimeout(function() {
//                event = event || window.event;
//                clientX = event.clientX;
//                clientY = event.clientY;
//                scheduled = false;
//            }, 1000);
//        }
//    });

//    //window.onbeforeunload = function () {
//    $(window).bind("unload", function (e) {
//        alert(clientY + ":" + clientX);
//        if (clientX < 0 || clientY < 0) {
//            // ajax call to server to nullify the session.                
//            //window.close();
//            alert("working");
//        }
//    });
//}

//function SessionClearingEvents() {
//    //
//    // This doesn't work - clientY is not a member of e
//    //
//    $(window).bind("unload", function (e) {
//        var y = this.clientY || this.screenY || this.pageY;
//        var x = e.clientY || e.screenY || e.pageY;

//        if (this.screenY < 0) {
//            endSession();
//        }
//    });

//    window.onbeforeunload = function (e) {
//        $(window).unbind("unload");

//        var y = this.clientY || this.screenY || this.pageY;
//        var x = e.clientY || e.screenY || e.pageY;

//        if (this.screenY < 0) {
//            endSession();
//        }
//    }
//}

//function endSession() {
//    //doWork;
//}