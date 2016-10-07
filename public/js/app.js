(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _styleSelect = require('styleSelect');

var _styleSelect2 = _interopRequireDefault(_styleSelect);

var _form = require('./components/form');

var _load = require('./components/load.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Run page init
(0, _load.pageInit)();
// Run form handling
(0, _form.formHandling)();
// Hook up styleSelect
(0, _styleSelect2.default)('.form__select');

},{"./components/form":2,"./components/load.js":3,"styleSelect":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var formHandling = function formHandling() {
    // Get the text inputting form els
    var formEls = document.querySelectorAll('.form__input, .form__textarea');

    // Loop the form els
    for (var i = 0; i < formEls.length; i++) {
        // Cache the current element
        var el = formEls[i];
        // Track 'input' events on element
        el.addEventListener('input', function (event) {
            // Cache the event.target
            var target = event.target;
            // If target has a value
            if (target.value) {
                // And if classList doesn't contain active class
                if (!target.classList.contains('form__has-value')) {
                    // Add active class
                    target.classList.add('form__has-value');
                }
                // Else if target doesn't have a value
            } else {
                // If classList contains active class
                if (target.classList.contains('form__has-value')) {
                    // Remove active class
                    target.classList.remove('form__has-value');
                }
            }
        });
    }
};
// Export so we can use as a module
exports.formHandling = formHandling;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Fade in on load
 * @param  {string} load    Class targeting elements to load
 * @param  {string} loading Class to apply when elements are loading
 * @param  {string} loaded  Class to apply when elements have loaded
 * @return {void}
 */
var fadeIn = function fadeIn(load, loading, loaded) {
    // Get the targeted elements
    var targets = document.querySelectorAll('.' + load);
    // Get the loader
    var loader = document.querySelector('.media__loader--holder');
    // Get the last index
    var last = targets.length - 1;
    // If we have targets
    if (targets.length) {
        // Loop through targets
        targets.forEach(function (target) {
            // Set the opacity of each element to 0
            target.style.opacity = 0;
        });
        // Watch for window load
        window.addEventListener('load', function () {
            // Item index
            var i = 0;
            // Loop through targets
            targets.forEach(function (target) {
                // Set timeout based upon index
                setTimeout(function () {
                    // Add the loading class
                    target.classList.add(loading);
                    // Remove style attribute from element
                    target.removeAttribute('style');
                    // Add the loaded class
                    target.classList.add(loaded);
                    // After half a second, remove all classes
                    setTimeout(function () {
                        target.classList.remove(load, loading, loaded);
                    }, 500);
                    // If we're on the last item
                    if (i === last) {
                        // Hide the loader
                        loader.style.opacity = 0;
                        setTimeout(function () {
                            return loader.parentNode.removeChild(loader);
                        }, 400);
                    }
                    i++;
                }, i * 200);
                // Increate the index
            });
        });
    }
};

/**
 * Handle window resizes
 * @param  {number} bp
 * @return {void}
 */
var onWindowResize = function onWindowResize(bp) {
    // Get the video
    var video = document.querySelectorAll('video')[0];
    // Set paused to false
    var paused = false;
    // Listen for window resize
    window.addEventListener('resize', function () {
        // If window outerWidth is less than bp and not paused
        if (window.outerWidth < bp && !paused) {
            // Pause the video
            video.pause();
            // Set paused to true
            paused = true;
            // Exit
            return;
        }
        // If window outerWidth is greater than bp and paused
        if (window.outerWidth >= bp && paused) {
            // Play video
            video.play();
            // Set paused to false
            paused = false;
        }
    });
    // Fire resize event on load
    window.dispatchEvent(new Event('resize', { bubbles: false, cancelable: false }));
};

/**
 * Check if element is in viewport
 * @param  {Element} element 
 * @param  {float}   start
 * @param  {float}   stop
 * @return {boolean}
 */
var inViewport = function inViewport(element, start) {
    // Get element dimensions
    var rect = element.getBoundingClientRect();
    // Get the document
    var html = document.documentElement;
    // Return boolean
    return (
        // If element is inside top sweet spot
        rect.top <= (window.innerHeight * start || html.clientHeight * start)
    );
};

/**
 * Apply class on scroll
 * @param  {string} active
 * @return {void}
 */
var applyClassOnScroll = function applyClassOnScroll(item, active) {
    var scrollEvent = function scrollEvent() {
        // If is in viewport and doesn't have active class
        if (inViewport(item, 0.95)) {
            // Add active class
            item.classList.add(active);
            unbindScroll();
            return;
        }
    };

    var unbindScroll = function unbindScroll() {
        window.removeEventListener('scroll', scrollEvent);
    };

    // Dispatch event on page load
    setTimeout(function () {
        // Listen for window scroll event
        window.addEventListener('scroll', scrollEvent);
        window.dispatchEvent(new Event('scroll', { bubbles: false, cancelable: false }));
    }, 500);
};

/**
 * Parent func to run all page init scripts
 * @return {void}
 */
var pageInit = function pageInit() {
    fadeIn('interaction--load', 'interaction--loading', 'interaction--loaded');
    onWindowResize(800);
    applyClassOnScroll(document.getElementById('grid'), 'interaction--scale');
};
// Export so we can use as a module
exports.pageInit = pageInit;

},{}],4:[function(require,module,exports){
// UMD module from From https://github.com/umdjs/umd/blob/master/returnExports.js
// From 'if the module has no dependencies' example.
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {
// End of UMD module

	// Quick aliases and polyfills if needed
	var query = document.querySelector.bind(document);
	var queryAll = document.querySelectorAll.bind(document);

	var KEYCODES = {
		SPACE: 32,
		UP: 38,
		DOWN: 40,
		ENTER: 13
	};

	if ( ! NodeList.prototype.forEach ) {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}
	if ( ! HTMLCollection.prototype.forEach ) {
		HTMLCollection.prototype.forEach = Array.prototype.forEach;
	}
	if ( ! Element.prototype.matches ) {
		// See https://developer.mozilla.org/en-US/docs/Web/API/Element.matches
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector
	}

	// IE 9-11 CustomEvent polyfill
	// From https://developer.mozilla.org/en/docs/Web/API/CustomEvent
	var CustomEvent = function( eventName, params ) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var event = document.createEvent( 'CustomEvent' );
		event.initCustomEvent( eventName, params.bubbles, params.cancelable, params.detail );
		return event;
	};
	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;

	// IE10 dataset polyfill
	// From https://gist.githubusercontent.com/brettz9/4093766/raw/ba31a05e7ce21af67c6cafee9b3f439c86e95b01/html5-dataset.js
	if (!document.documentElement.dataset &&
			 // FF is empty while IE gives empty object
			(!Object.getOwnPropertyDescriptor(Element.prototype, 'dataset')  ||
			!Object.getOwnPropertyDescriptor(Element.prototype, 'dataset').get)
		) {
		var propDescriptor = {
			enumerable: true,
			get: function () {
				'use strict';
				var i,
					that = this,
					HTML5_DOMStringMap,
					attrVal, attrName, propName,
					attribute,
					attributes = this.attributes,
					attsLength = attributes.length,
					toUpperCase = function (n0) {
						return n0.charAt(1).toUpperCase();
					},
					getter = function () {
						return this;
					},
					setter = function (attrName, value) {
						return (typeof value !== 'undefined') ?
							this.setAttribute(attrName, value) :
							this.removeAttribute(attrName);
					};
				try { // Simulate DOMStringMap w/accessor support
					// Test setting accessor on normal object
					({}).__defineGetter__('test', function () {});
					HTML5_DOMStringMap = {};
				}
				catch (e1) { // Use a DOM object for IE8
					HTML5_DOMStringMap = document.createElement('div');
				}
				for (i = 0; i < attsLength; i++) {
					attribute = attributes[i];
					// Fix: This test really should allow any XML Name without
					//         colons (and non-uppercase for XHTML)
					if (attribute && attribute.name &&
						(/^data-\w[\w\-]*$/).test(attribute.name)) {
						attrVal = attribute.value;
						attrName = attribute.name;
						// Change to CamelCase
						propName = attrName.substr(5).replace(/-./g, toUpperCase);
						try {
							Object.defineProperty(HTML5_DOMStringMap, propName, {
								enumerable: this.enumerable,
								get: getter.bind(attrVal || ''),
								set: setter.bind(that, attrName)
							});
						}
						catch (e2) { // if accessors are not working
							HTML5_DOMStringMap[propName] = attrVal;
						}
					}
				}
				return HTML5_DOMStringMap;
			}
		};
		try {
			// FF enumerates over element's dataset, but not
			//   Element.prototype.dataset; IE9 iterates over both
			Object.defineProperty(Element.prototype, 'dataset', propDescriptor);
		} catch (e) {
			propDescriptor.enumerable = false; // IE8 does not allow setting to true
			Object.defineProperty(Element.prototype, 'dataset', propDescriptor);
		}
	}

	// Return true if any ancestor matches selector
	// Borrowed from ancestorMatches() from agave.js (MIT)
	var isAncestorOf = function(element, selector, includeSelf) {
		var parent = element.parentNode;
		if ( includeSelf && element.matches(selector) ) {
			return true
		}
		// While parents are 'element' type nodes
		// See https://developer.mozilla.org/en-US/docs/DOM/Node.nodeType
		while ( parent && parent.nodeType && parent.nodeType === 1 ) {
			if ( parent.matches(selector) ) {
				return true
			}
			parent = parent.parentNode;
		}
		return false;
	};


	// Used to match select boxes to their style select partners
	var makeUUID = function(){
		return 'ss-xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/x/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
			return v.toString(16);
		})
	};


	// The 'styleSelect' main function
	// selector:String - CSS selector for the select box to style
	return function(selector) {

		// Use native selects (which pop up large native UIs to go through the options ) on iOS/Android
		if ( navigator.userAgent.match( /iPad|iPhone|Android/i ) ) {
			return
		}

		var realSelect = typeof selector == 'object' ? selector : query(selector),
			realOptions = realSelect.children,
			selectedIndex = realSelect.selectedIndex,
			uuid = makeUUID(),
			styleSelectHTML = '<div class="style-select" aria-hidden="true" data-ss-uuid="' + uuid + '">';

		// The index of the item that's being highlighted by the mouse or keyboard
		var highlightedOptionIndex;
		var highlightedOptionIndexMax = realOptions.length - 1;

		realSelect.setAttribute('data-ss-uuid', uuid);
		// Even though the element is display: none, a11y users should still see it.
		// According to http://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
		// some browsers may have bugs with this but future implementation may improve
		realSelect.setAttribute('aria-hidden', "false");

		// Build styled clones of all the real options
		var selectedOptionHTML;
		var optionsHTML = '<div class="ss-dropdown">';
		realOptions.forEach(function(realOption, index){
			var text = realOption.textContent,
				value = realOption.getAttribute('value') || '',
                cssClass = 'ss-option';

			if (index === selectedIndex) {
				// Mark first item as selected-option - this is where we store state for the styled select box
				// aria-hidden=true so screen readers ignore the styles selext box in favor of the real one (which is visible by default)
				selectedOptionHTML = '<div class="ss-selected-option" tabindex="0" data-value="' + value + '">' + text + '</div>'
			}

            if (realOption.disabled) {
                cssClass += ' disabled';
            }

            // Continue building optionsHTML
			optionsHTML += '<div class="' + cssClass + '" data-value="' + value + '">' + text + '</div>';
		});
		optionsHTML += '</div>';
		styleSelectHTML += selectedOptionHTML += optionsHTML += '</div>';
		// And add out styled select just after the real select
		realSelect.insertAdjacentHTML('afterend', styleSelectHTML);

		var styledSelect = query('.style-select[data-ss-uuid="'+uuid+'"]');
		var styleSelectOptions = styledSelect.querySelectorAll('.ss-option');
		var selectedOption = styledSelect.querySelector('.ss-selected-option');

		var changeRealSelectBox = function(newValue, newLabel) {
			// Close styledSelect
			styledSelect.classList.remove('open');

			// Update styled value
			selectedOption.textContent = newLabel;
			selectedOption.dataset.value = newValue;

			// Update the 'tick' that shows the option with the current value
			styleSelectOptions.forEach(function(styleSelectOption){
				if ( styleSelectOption.dataset.value === newValue) {
					styleSelectOption.classList.add('ticked')
				} else {
					styleSelectOption.classList.remove('ticked')
				}
			});

			// Update real select box
			realSelect.value = newValue;

			// Send 'change' event to real select - to trigger any change event listeners
			var changeEvent = new CustomEvent('change');
			realSelect.dispatchEvent(changeEvent);
		};

		// Change real select box when a styled option is clicked
		styleSelectOptions.forEach(function(unused, index){
			var styleSelectOption = styleSelectOptions.item(index);

            if (styleSelectOption.className.match(/\bdisabled\b/)) {
                return;
            }

            styleSelectOption.addEventListener('click', function(ev) {
				var target = ev.target,
					styledSelectBox = target.parentNode.parentNode,
					uuid = styledSelectBox.getAttribute('data-ss-uuid'),
					newValue = target.getAttribute('data-value'),
					newLabel = target.textContent;

				changeRealSelectBox(newValue, newLabel)

			});

			// Tick and highlight the option that's currently in use
			if ( styleSelectOption.dataset.value === realSelect.value ) {
				highlightedOptionIndex = index;
				styleSelectOption.classList.add('ticked');
				styleSelectOption.classList.add('highlighted')
			}

			// Important: we can't use ':hover' as the keyboard and default value can also set the highlight
			styleSelectOption.addEventListener('mouseover', function(ev){
				styleSelectOption.parentNode.childNodes.forEach(function(sibling, index){
					if ( sibling === ev.target ) {
						sibling.classList.add('highlighted');
						highlightedOptionIndex = index;
					} else {
						sibling.classList.remove('highlighted')
					}
				})
			})
		});



		var closeAllStyleSelects = function(exception){
			queryAll('.style-select').forEach(function(styleSelectEl) {
				if ( styleSelectEl !== exception ) {
					styleSelectEl.classList.remove('open');
				}
			});
		};

		var toggleStyledSelect = function(styledSelectBox){
			if ( ! styledSelectBox.classList.contains('open') ) {
				// If we're closed and about to open, close other style selects on the page
				closeAllStyleSelects(styledSelectBox);
			}
			// Then toggle open/close
			styledSelectBox.classList.toggle('open');
		};

		// When a styled select box is clicked
		var styledSelectedOption = query('.style-select[data-ss-uuid="' + uuid + '"] .ss-selected-option');
		styledSelectedOption.addEventListener('click', function(ev) {
			ev.preventDefault();
			ev.stopPropagation();
			toggleStyledSelect(ev.target.parentNode);
		});

		// Keyboard handling
		styledSelectedOption.addEventListener('keydown', function(ev) {
			var styledSelectBox = ev.target.parentNode;

			switch (ev.keyCode) {
				case KEYCODES.SPACE:
					// Space shows and hides styles select boxes
					toggleStyledSelect(styledSelectBox);
					break;
				case KEYCODES.DOWN:
				case KEYCODES.UP:
					// Move the highlight up and down
					if ( ! styledSelectBox.classList.contains('open') ) {
						// If style select is not open, up/down should open it.
						toggleStyledSelect(styledSelectBox);
					} else {
						// If style select is already open, these should change what the highlighted option is
						if ( ev.keyCode === KEYCODES.UP ) {
							// Up arrow moves earlier in list
							if ( highlightedOptionIndex !== 0 ) {
								highlightedOptionIndex = highlightedOptionIndex - 1
							}
						} else {
							// Down arrow moves later in list
							if ( highlightedOptionIndex < highlightedOptionIndexMax ) {
								highlightedOptionIndex = highlightedOptionIndex + 1
							}
						}
						styleSelectOptions.forEach(function(option, index){
							if ( index === highlightedOptionIndex ) {
								option.classList.add('highlighted')
							} else {
								option.classList.remove('highlighted')
							}
						})
					}
					ev.preventDefault();
					ev.stopPropagation();
					break;
				// User has picked an item from the keyboard
				case KEYCODES.ENTER:
					var highlightedOption = styledSelectedOption.parentNode.querySelectorAll('.ss-option')[highlightedOptionIndex],
						newValue = highlightedOption.dataset.value,
						newLabel = highlightedOption.textContent;

					changeRealSelectBox(newValue, newLabel);
					ev.preventDefault();
					ev.stopPropagation();
					break;
			}
		});

		// Clicking outside of the styled select box closes any open styled select boxes
		query('body').addEventListener('click', function(ev){

			if ( ! isAncestorOf(ev.target, '.style-select', true) ) {
				closeAllStyleSelects();
			}
		})

	};

// Close UMD module
}));


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvYXBwLmpzIiwiYXNzZXRzL2pzL2NvbXBvbmVudHMvZm9ybS5qcyIsImFzc2V0cy9qcy9jb21wb25lbnRzL2xvYWQuanMiLCJub2RlX21vZHVsZXMvc3R5bGVTZWxlY3QvanMvc3R5bGVzZWxlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQVksZUFBWjs7Ozs7Ozs7QUNSQyxJQUFNLGVBQWUsU0FBZixZQUFlLEdBQU07QUFDdkI7QUFDQSxRQUFNLFVBQVUsU0FBUyxnQkFBVCxDQUEwQiwrQkFBMUIsQ0FBaEI7O0FBRUE7QUFDQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksUUFBUSxNQUE1QixFQUFvQyxHQUFwQyxFQUF5QztBQUNyQztBQUNBLFlBQUksS0FBSyxRQUFRLENBQVIsQ0FBVDtBQUNBO0FBQ0EsV0FBRyxnQkFBSCxDQUFvQixPQUFwQixFQUE2QixVQUFDLEtBQUQsRUFBVztBQUNwQztBQUNBLGdCQUFNLFNBQVMsTUFBTSxNQUFyQjtBQUNBO0FBQ0EsZ0JBQUksT0FBTyxLQUFYLEVBQWtCO0FBQ2Q7QUFDQSxvQkFBSSxDQUFDLE9BQU8sU0FBUCxDQUFpQixRQUFqQixDQUEwQixpQkFBMUIsQ0FBTCxFQUFtRDtBQUMvQztBQUNBLDJCQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsaUJBQXJCO0FBQ0g7QUFDTDtBQUNDLGFBUEQsTUFPTztBQUNIO0FBQ0Esb0JBQUksT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLGlCQUExQixDQUFKLEVBQWtEO0FBQzlDO0FBQ0EsMkJBQU8sU0FBUCxDQUFpQixNQUFqQixDQUF3QixpQkFBeEI7QUFDSDtBQUNKO0FBQ0osU0FsQkQ7QUFtQkg7QUFDSixDQTdCRDtBQThCRDtRQUNTLFksR0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHN0eWxlU2VsZWN0IGZyb20gJ3N0eWxlU2VsZWN0JztcbmltcG9ydCB7IGZvcm1IYW5kbGluZyB9IGZyb20gJy4vY29tcG9uZW50cy9mb3JtJztcbmltcG9ydCB7IHBhZ2VJbml0IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvYWQuanMnO1xuLy8gUnVuIHBhZ2UgaW5pdFxucGFnZUluaXQoKTtcbi8vIFJ1biBmb3JtIGhhbmRsaW5nXG5mb3JtSGFuZGxpbmcoKTtcbi8vIEhvb2sgdXAgc3R5bGVTZWxlY3RcbnN0eWxlU2VsZWN0KCcuZm9ybV9fc2VsZWN0Jyk7XG4iLCIgY29uc3QgZm9ybUhhbmRsaW5nID0gKCkgPT4ge1xuICAgICAvLyBHZXQgdGhlIHRleHQgaW5wdXR0aW5nIGZvcm0gZWxzXG4gICAgIGNvbnN0IGZvcm1FbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybV9faW5wdXQsIC5mb3JtX190ZXh0YXJlYScpO1xuICAgICBcbiAgICAgLy8gTG9vcCB0aGUgZm9ybSBlbHNcbiAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtRWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAvLyBDYWNoZSB0aGUgY3VycmVudCBlbGVtZW50XG4gICAgICAgICBsZXQgZWwgPSBmb3JtRWxzW2ldO1xuICAgICAgICAgLy8gVHJhY2sgJ2lucHV0JyBldmVudHMgb24gZWxlbWVudFxuICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAvLyBDYWNoZSB0aGUgZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgIC8vIElmIHRhcmdldCBoYXMgYSB2YWx1ZVxuICAgICAgICAgICAgIGlmICh0YXJnZXQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgLy8gQW5kIGlmIGNsYXNzTGlzdCBkb2Vzbid0IGNvbnRhaW4gYWN0aXZlIGNsYXNzXG4gICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZm9ybV9faGFzLXZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCBhY3RpdmUgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdmb3JtX19oYXMtdmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC8vIEVsc2UgaWYgdGFyZ2V0IGRvZXNuJ3QgaGF2ZSBhIHZhbHVlXG4gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgLy8gSWYgY2xhc3NMaXN0IGNvbnRhaW5zIGFjdGl2ZSBjbGFzc1xuICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZm9ybV9faGFzLXZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdmb3JtX19oYXMtdmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgICB9XG4gfVxuLy8gRXhwb3J0IHNvIHdlIGNhbiB1c2UgYXMgYSBtb2R1bGVcbmV4cG9ydCB7IGZvcm1IYW5kbGluZyB9O1xuIiwiLyoqXG4gKiBGYWRlIGluIG9uIGxvYWRcbiAqIEBwYXJhbSAge3N0cmluZ30gbG9hZCAgICBDbGFzcyB0YXJnZXRpbmcgZWxlbWVudHMgdG8gbG9hZFxuICogQHBhcmFtICB7c3RyaW5nfSBsb2FkaW5nIENsYXNzIHRvIGFwcGx5IHdoZW4gZWxlbWVudHMgYXJlIGxvYWRpbmdcbiAqIEBwYXJhbSAge3N0cmluZ30gbG9hZGVkICBDbGFzcyB0byBhcHBseSB3aGVuIGVsZW1lbnRzIGhhdmUgbG9hZGVkXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5jb25zdCBmYWRlSW4gPSAobG9hZCwgbG9hZGluZywgbG9hZGVkKSA9PiB7XG4gICAgLy8gR2V0IHRoZSB0YXJnZXRlZCBlbGVtZW50c1xuICAgIGNvbnN0IHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtsb2FkfWApO1xuICAgIC8vIEdldCB0aGUgbG9hZGVyXG4gICAgY29uc3QgbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lZGlhX19sb2FkZXItLWhvbGRlcicpO1xuICAgIC8vIEdldCB0aGUgbGFzdCBpbmRleFxuICAgIGNvbnN0IGxhc3QgPSB0YXJnZXRzLmxlbmd0aCAtIDE7XG4gICAgLy8gSWYgd2UgaGF2ZSB0YXJnZXRzXG4gICAgaWYgKHRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCB0YXJnZXRzXG4gICAgICAgIHRhcmdldHMuZm9yRWFjaCh0YXJnZXQgPT4ge1xuICAgICAgICAgICAgLy8gU2V0IHRoZSBvcGFjaXR5IG9mIGVhY2ggZWxlbWVudCB0byAwXG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBXYXRjaCBmb3Igd2luZG93IGxvYWRcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBJdGVtIGluZGV4XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggdGFyZ2V0c1xuICAgICAgICAgICAgdGFyZ2V0cy5mb3JFYWNoKHRhcmdldCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gU2V0IHRpbWVvdXQgYmFzZWQgdXBvbiBpbmRleFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIGxvYWRpbmcgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQobG9hZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBzdHlsZSBhdHRyaWJ1dGUgZnJvbSBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgbG9hZGVkIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKGxvYWRlZCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFmdGVyIGhhbGYgYSBzZWNvbmQsIHJlbW92ZSBhbGwgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKGxvYWQsbG9hZGluZyxsb2FkZWQpO1xuICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSdyZSBvbiB0aGUgbGFzdCBpdGVtXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSBsYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBIaWRlIHRoZSBsb2FkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlci5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbG9hZGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobG9hZGVyKSwgNDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgfSwgaSAqIDIwMCk7XG4gICAgICAgICAgICAgICAgLy8gSW5jcmVhdGUgdGhlIGluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEhhbmRsZSB3aW5kb3cgcmVzaXplc1xuICogQHBhcmFtICB7bnVtYmVyfSBicFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuY29uc3Qgb25XaW5kb3dSZXNpemUgPSBicCA9PiB7XG4gICAgLy8gR2V0IHRoZSB2aWRlb1xuICAgIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndmlkZW8nKVswXTtcbiAgICAvLyBTZXQgcGF1c2VkIHRvIGZhbHNlXG4gICAgbGV0IHBhdXNlZCA9IGZhbHNlO1xuICAgIC8vIExpc3RlbiBmb3Igd2luZG93IHJlc2l6ZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICAgIC8vIElmIHdpbmRvdyBvdXRlcldpZHRoIGlzIGxlc3MgdGhhbiBicCBhbmQgbm90IHBhdXNlZFxuICAgICAgICBpZiAod2luZG93Lm91dGVyV2lkdGggPCBicCAmJiAhcGF1c2VkKSB7XG4gICAgICAgICAgICAvLyBQYXVzZSB0aGUgdmlkZW9cbiAgICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICAvLyBTZXQgcGF1c2VkIHRvIHRydWVcbiAgICAgICAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICAvLyBFeGl0XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2luZG93IG91dGVyV2lkdGggaXMgZ3JlYXRlciB0aGFuIGJwIGFuZCBwYXVzZWRcbiAgICAgICAgaWYgKHdpbmRvdy5vdXRlcldpZHRoID49IGJwICYmIHBhdXNlZCkge1xuICAgICAgICAgICAgLy8gUGxheSB2aWRlb1xuICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgLy8gU2V0IHBhdXNlZCB0byBmYWxzZVxuICAgICAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBGaXJlIHJlc2l6ZSBldmVudCBvbiBsb2FkXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyZXNpemUnLCB7YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlfSkpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGVsZW1lbnQgaXMgaW4gdmlld3BvcnRcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW1lbnQgXG4gKiBAcGFyYW0gIHtmbG9hdH0gICBzdGFydFxuICogQHBhcmFtICB7ZmxvYXR9ICAgc3RvcFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaW5WaWV3cG9ydCA9IChlbGVtZW50LCBzdGFydCkgPT4ge1xuICAgIC8vIEdldCBlbGVtZW50IGRpbWVuc2lvbnNcbiAgICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyBHZXQgdGhlIGRvY3VtZW50XG4gICAgY29uc3QgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAvLyBSZXR1cm4gYm9vbGVhblxuICAgIHJldHVybiAoXG4gICAgICAgIC8vIElmIGVsZW1lbnQgaXMgaW5zaWRlIHRvcCBzd2VldCBzcG90XG4gICAgICAgIHJlY3QudG9wIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgKiBzdGFydCB8fCBodG1sLmNsaWVudEhlaWdodCAqIHN0YXJ0KVxuICAgICk7XG59XG5cbi8qKlxuICogQXBwbHkgY2xhc3Mgb24gc2Nyb2xsXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGFjdGl2ZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuY29uc3QgYXBwbHlDbGFzc09uU2Nyb2xsID0gKGl0ZW0sIGFjdGl2ZSkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbEV2ZW50ID0gKCkgPT4ge1xuICAgICAgICAvLyBJZiBpcyBpbiB2aWV3cG9ydCBhbmQgZG9lc24ndCBoYXZlIGFjdGl2ZSBjbGFzc1xuICAgICAgICBpZiAoaW5WaWV3cG9ydChpdGVtLCAwLjk1KSkge1xuICAgICAgICAgICAgLy8gQWRkIGFjdGl2ZSBjbGFzc1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKGFjdGl2ZSk7XG4gICAgICAgICAgICB1bmJpbmRTY3JvbGwoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCB1bmJpbmRTY3JvbGwgPSAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxFdmVudCk7XG4gICAgfVxuICAgIFxuICAgIC8vIERpc3BhdGNoIGV2ZW50IG9uIHBhZ2UgbG9hZFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyBMaXN0ZW4gZm9yIHdpbmRvdyBzY3JvbGwgZXZlbnRcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjcm9sbEV2ZW50KTtcbiAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdzY3JvbGwnLCB7YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlfSkpO1xuICAgIH0sIDUwMCk7XG59XG5cbi8qKlxuICogUGFyZW50IGZ1bmMgdG8gcnVuIGFsbCBwYWdlIGluaXQgc2NyaXB0c1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuY29uc3QgcGFnZUluaXQgPSAoKSA9PiB7XG4gICAgZmFkZUluKCdpbnRlcmFjdGlvbi0tbG9hZCcsICdpbnRlcmFjdGlvbi0tbG9hZGluZycsICdpbnRlcmFjdGlvbi0tbG9hZGVkJyk7XG4gICAgb25XaW5kb3dSZXNpemUoODAwKVxuICAgIGFwcGx5Q2xhc3NPblNjcm9sbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZCcpLCAnaW50ZXJhY3Rpb24tLXNjYWxlJyk7XG59XG4vLyBFeHBvcnQgc28gd2UgY2FuIHVzZSBhcyBhIG1vZHVsZVxuZXhwb3J0IHsgcGFnZUluaXQgfTtcbiIsIi8vIFVNRCBtb2R1bGUgZnJvbSBGcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS91bWRqcy91bWQvYmxvYi9tYXN0ZXIvcmV0dXJuRXhwb3J0cy5qc1xyXG4vLyBGcm9tICdpZiB0aGUgbW9kdWxlIGhhcyBubyBkZXBlbmRlbmNpZXMnIGV4YW1wbGUuXHJcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xyXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cclxuICAgICAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcclxuICAgICAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcclxuICAgICAgICAvLyBsaWtlIE5vZGUuXHJcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFscyAocm9vdCBpcyB3aW5kb3cpXHJcbiAgICAgICAgcm9vdC5yZXR1cm5FeHBvcnRzID0gZmFjdG9yeSgpO1xyXG4gIH1cclxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XHJcbi8vIEVuZCBvZiBVTUQgbW9kdWxlXHJcblxyXG5cdC8vIFF1aWNrIGFsaWFzZXMgYW5kIHBvbHlmaWxscyBpZiBuZWVkZWRcclxuXHR2YXIgcXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpO1xyXG5cdHZhciBxdWVyeUFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwuYmluZChkb2N1bWVudCk7XHJcblxyXG5cdHZhciBLRVlDT0RFUyA9IHtcclxuXHRcdFNQQUNFOiAzMixcclxuXHRcdFVQOiAzOCxcclxuXHRcdERPV046IDQwLFxyXG5cdFx0RU5URVI6IDEzXHJcblx0fTtcclxuXHJcblx0aWYgKCAhIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoICkge1xyXG5cdFx0Tm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcclxuXHR9XHJcblx0aWYgKCAhIEhUTUxDb2xsZWN0aW9uLnByb3RvdHlwZS5mb3JFYWNoICkge1xyXG5cdFx0SFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLmZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcclxuXHR9XHJcblx0aWYgKCAhIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgKSB7XHJcblx0XHQvLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQubWF0Y2hlc1xyXG5cdFx0RWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUub01hdGNoZXNTZWxlY3RvclxyXG5cdH1cclxuXHJcblx0Ly8gSUUgOS0xMSBDdXN0b21FdmVudCBwb2x5ZmlsbFxyXG5cdC8vIEZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50XHJcblx0dmFyIEN1c3RvbUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgcGFyYW1zICkge1xyXG5cdFx0cGFyYW1zID0gcGFyYW1zIHx8IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZCB9O1xyXG5cdFx0dmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoICdDdXN0b21FdmVudCcgKTtcclxuXHRcdGV2ZW50LmluaXRDdXN0b21FdmVudCggZXZlbnROYW1lLCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwgKTtcclxuXHRcdHJldHVybiBldmVudDtcclxuXHR9O1xyXG5cdEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XHJcblx0d2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7XHJcblxyXG5cdC8vIElFMTAgZGF0YXNldCBwb2x5ZmlsbFxyXG5cdC8vIEZyb20gaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9icmV0dHo5LzQwOTM3NjYvcmF3L2JhMzFhMDVlN2NlMjFhZjY3YzZjYWZlZTliM2Y0MzljODZlOTViMDEvaHRtbDUtZGF0YXNldC5qc1xyXG5cdGlmICghZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRhdGFzZXQgJiZcclxuXHRcdFx0IC8vIEZGIGlzIGVtcHR5IHdoaWxlIElFIGdpdmVzIGVtcHR5IG9iamVjdFxyXG5cdFx0XHQoIU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRWxlbWVudC5wcm90b3R5cGUsICdkYXRhc2V0JykgIHx8XHJcblx0XHRcdCFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEVsZW1lbnQucHJvdG90eXBlLCAnZGF0YXNldCcpLmdldClcclxuXHRcdCkge1xyXG5cdFx0dmFyIHByb3BEZXNjcmlwdG9yID0ge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRcdFx0dmFyIGksXHJcblx0XHRcdFx0XHR0aGF0ID0gdGhpcyxcclxuXHRcdFx0XHRcdEhUTUw1X0RPTVN0cmluZ01hcCxcclxuXHRcdFx0XHRcdGF0dHJWYWwsIGF0dHJOYW1lLCBwcm9wTmFtZSxcclxuXHRcdFx0XHRcdGF0dHJpYnV0ZSxcclxuXHRcdFx0XHRcdGF0dHJpYnV0ZXMgPSB0aGlzLmF0dHJpYnV0ZXMsXHJcblx0XHRcdFx0XHRhdHRzTGVuZ3RoID0gYXR0cmlidXRlcy5sZW5ndGgsXHJcblx0XHRcdFx0XHR0b1VwcGVyQ2FzZSA9IGZ1bmN0aW9uIChuMCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbjAuY2hhckF0KDEpLnRvVXBwZXJDYXNlKCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Z2V0dGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRzZXR0ZXIgPSBmdW5jdGlvbiAoYXR0ck5hbWUsIHZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykgP1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCB2YWx1ZSkgOlxyXG5cdFx0XHRcdFx0XHRcdHRoaXMucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0dHJ5IHsgLy8gU2ltdWxhdGUgRE9NU3RyaW5nTWFwIHcvYWNjZXNzb3Igc3VwcG9ydFxyXG5cdFx0XHRcdFx0Ly8gVGVzdCBzZXR0aW5nIGFjY2Vzc29yIG9uIG5vcm1hbCBvYmplY3RcclxuXHRcdFx0XHRcdCh7fSkuX19kZWZpbmVHZXR0ZXJfXygndGVzdCcsIGZ1bmN0aW9uICgpIHt9KTtcclxuXHRcdFx0XHRcdEhUTUw1X0RPTVN0cmluZ01hcCA9IHt9O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZTEpIHsgLy8gVXNlIGEgRE9NIG9iamVjdCBmb3IgSUU4XHJcblx0XHRcdFx0XHRIVE1MNV9ET01TdHJpbmdNYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGF0dHNMZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0YXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcclxuXHRcdFx0XHRcdC8vIEZpeDogVGhpcyB0ZXN0IHJlYWxseSBzaG91bGQgYWxsb3cgYW55IFhNTCBOYW1lIHdpdGhvdXRcclxuXHRcdFx0XHRcdC8vICAgICAgICAgY29sb25zIChhbmQgbm9uLXVwcGVyY2FzZSBmb3IgWEhUTUwpXHJcblx0XHRcdFx0XHRpZiAoYXR0cmlidXRlICYmIGF0dHJpYnV0ZS5uYW1lICYmXHJcblx0XHRcdFx0XHRcdCgvXmRhdGEtXFx3W1xcd1xcLV0qJC8pLnRlc3QoYXR0cmlidXRlLm5hbWUpKSB7XHJcblx0XHRcdFx0XHRcdGF0dHJWYWwgPSBhdHRyaWJ1dGUudmFsdWU7XHJcblx0XHRcdFx0XHRcdGF0dHJOYW1lID0gYXR0cmlidXRlLm5hbWU7XHJcblx0XHRcdFx0XHRcdC8vIENoYW5nZSB0byBDYW1lbENhc2VcclxuXHRcdFx0XHRcdFx0cHJvcE5hbWUgPSBhdHRyTmFtZS5zdWJzdHIoNSkucmVwbGFjZSgvLS4vZywgdG9VcHBlckNhc2UpO1xyXG5cdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MNV9ET01TdHJpbmdNYXAsIHByb3BOYW1lLCB7XHJcblx0XHRcdFx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0aGlzLmVudW1lcmFibGUsXHJcblx0XHRcdFx0XHRcdFx0XHRnZXQ6IGdldHRlci5iaW5kKGF0dHJWYWwgfHwgJycpLFxyXG5cdFx0XHRcdFx0XHRcdFx0c2V0OiBzZXR0ZXIuYmluZCh0aGF0LCBhdHRyTmFtZSlcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRjYXRjaCAoZTIpIHsgLy8gaWYgYWNjZXNzb3JzIGFyZSBub3Qgd29ya2luZ1xyXG5cdFx0XHRcdFx0XHRcdEhUTUw1X0RPTVN0cmluZ01hcFtwcm9wTmFtZV0gPSBhdHRyVmFsO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBIVE1MNV9ET01TdHJpbmdNYXA7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyBGRiBlbnVtZXJhdGVzIG92ZXIgZWxlbWVudCdzIGRhdGFzZXQsIGJ1dCBub3RcclxuXHRcdFx0Ly8gICBFbGVtZW50LnByb3RvdHlwZS5kYXRhc2V0OyBJRTkgaXRlcmF0ZXMgb3ZlciBib3RoXHJcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFbGVtZW50LnByb3RvdHlwZSwgJ2RhdGFzZXQnLCBwcm9wRGVzY3JpcHRvcik7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHByb3BEZXNjcmlwdG9yLmVudW1lcmFibGUgPSBmYWxzZTsgLy8gSUU4IGRvZXMgbm90IGFsbG93IHNldHRpbmcgdG8gdHJ1ZVxyXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoRWxlbWVudC5wcm90b3R5cGUsICdkYXRhc2V0JywgcHJvcERlc2NyaXB0b3IpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gUmV0dXJuIHRydWUgaWYgYW55IGFuY2VzdG9yIG1hdGNoZXMgc2VsZWN0b3JcclxuXHQvLyBCb3Jyb3dlZCBmcm9tIGFuY2VzdG9yTWF0Y2hlcygpIGZyb20gYWdhdmUuanMgKE1JVClcclxuXHR2YXIgaXNBbmNlc3Rvck9mID0gZnVuY3Rpb24oZWxlbWVudCwgc2VsZWN0b3IsIGluY2x1ZGVTZWxmKSB7XHJcblx0XHR2YXIgcGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xyXG5cdFx0aWYgKCBpbmNsdWRlU2VsZiAmJiBlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpICkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0fVxyXG5cdFx0Ly8gV2hpbGUgcGFyZW50cyBhcmUgJ2VsZW1lbnQnIHR5cGUgbm9kZXNcclxuXHRcdC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0RPTS9Ob2RlLm5vZGVUeXBlXHJcblx0XHR3aGlsZSAoIHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgJiYgcGFyZW50Lm5vZGVUeXBlID09PSAxICkge1xyXG5cdFx0XHRpZiAoIHBhcmVudC5tYXRjaGVzKHNlbGVjdG9yKSApIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH07XHJcblxyXG5cclxuXHQvLyBVc2VkIHRvIG1hdGNoIHNlbGVjdCBib3hlcyB0byB0aGVpciBzdHlsZSBzZWxlY3QgcGFydG5lcnNcclxuXHR2YXIgbWFrZVVVSUQgPSBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuICdzcy14eHh4LXh4eHgteHh4eC14eHh4LXh4eHgnLnJlcGxhY2UoL3gvZywgZnVuY3Rpb24gKGMpIHtcclxuXHRcdFx0dmFyIHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwLCB2ID0gYyA9PSAneCcgPyByIDogciAmIDB4MyB8IDB4ODtcclxuXHRcdFx0cmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG5cdFx0fSlcclxuXHR9O1xyXG5cclxuXHJcblx0Ly8gVGhlICdzdHlsZVNlbGVjdCcgbWFpbiBmdW5jdGlvblxyXG5cdC8vIHNlbGVjdG9yOlN0cmluZyAtIENTUyBzZWxlY3RvciBmb3IgdGhlIHNlbGVjdCBib3ggdG8gc3R5bGVcclxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcclxuXHJcblx0XHQvLyBVc2UgbmF0aXZlIHNlbGVjdHMgKHdoaWNoIHBvcCB1cCBsYXJnZSBuYXRpdmUgVUlzIHRvIGdvIHRocm91Z2ggdGhlIG9wdGlvbnMgKSBvbiBpT1MvQW5kcm9pZFxyXG5cdFx0aWYgKCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKCAvaVBhZHxpUGhvbmV8QW5kcm9pZC9pICkgKSB7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciByZWFsU2VsZWN0ID0gdHlwZW9mIHNlbGVjdG9yID09ICdvYmplY3QnID8gc2VsZWN0b3IgOiBxdWVyeShzZWxlY3RvciksXHJcblx0XHRcdHJlYWxPcHRpb25zID0gcmVhbFNlbGVjdC5jaGlsZHJlbixcclxuXHRcdFx0c2VsZWN0ZWRJbmRleCA9IHJlYWxTZWxlY3Quc2VsZWN0ZWRJbmRleCxcclxuXHRcdFx0dXVpZCA9IG1ha2VVVUlEKCksXHJcblx0XHRcdHN0eWxlU2VsZWN0SFRNTCA9ICc8ZGl2IGNsYXNzPVwic3R5bGUtc2VsZWN0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGF0YS1zcy11dWlkPVwiJyArIHV1aWQgKyAnXCI+JztcclxuXHJcblx0XHQvLyBUaGUgaW5kZXggb2YgdGhlIGl0ZW0gdGhhdCdzIGJlaW5nIGhpZ2hsaWdodGVkIGJ5IHRoZSBtb3VzZSBvciBrZXlib2FyZFxyXG5cdFx0dmFyIGhpZ2hsaWdodGVkT3B0aW9uSW5kZXg7XHJcblx0XHR2YXIgaGlnaGxpZ2h0ZWRPcHRpb25JbmRleE1heCA9IHJlYWxPcHRpb25zLmxlbmd0aCAtIDE7XHJcblxyXG5cdFx0cmVhbFNlbGVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3MtdXVpZCcsIHV1aWQpO1xyXG5cdFx0Ly8gRXZlbiB0aG91Z2ggdGhlIGVsZW1lbnQgaXMgZGlzcGxheTogbm9uZSwgYTExeSB1c2VycyBzaG91bGQgc3RpbGwgc2VlIGl0LlxyXG5cdFx0Ly8gQWNjb3JkaW5nIHRvIGh0dHA6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhL3N0YXRlc19hbmRfcHJvcGVydGllcyNhcmlhLWhpZGRlblxyXG5cdFx0Ly8gc29tZSBicm93c2VycyBtYXkgaGF2ZSBidWdzIHdpdGggdGhpcyBidXQgZnV0dXJlIGltcGxlbWVudGF0aW9uIG1heSBpbXByb3ZlXHJcblx0XHRyZWFsU2VsZWN0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBcImZhbHNlXCIpO1xyXG5cclxuXHRcdC8vIEJ1aWxkIHN0eWxlZCBjbG9uZXMgb2YgYWxsIHRoZSByZWFsIG9wdGlvbnNcclxuXHRcdHZhciBzZWxlY3RlZE9wdGlvbkhUTUw7XHJcblx0XHR2YXIgb3B0aW9uc0hUTUwgPSAnPGRpdiBjbGFzcz1cInNzLWRyb3Bkb3duXCI+JztcclxuXHRcdHJlYWxPcHRpb25zLmZvckVhY2goZnVuY3Rpb24ocmVhbE9wdGlvbiwgaW5kZXgpe1xyXG5cdFx0XHR2YXIgdGV4dCA9IHJlYWxPcHRpb24udGV4dENvbnRlbnQsXHJcblx0XHRcdFx0dmFsdWUgPSByZWFsT3B0aW9uLmdldEF0dHJpYnV0ZSgndmFsdWUnKSB8fCAnJyxcclxuICAgICAgICAgICAgICAgIGNzc0NsYXNzID0gJ3NzLW9wdGlvbic7XHJcblxyXG5cdFx0XHRpZiAoaW5kZXggPT09IHNlbGVjdGVkSW5kZXgpIHtcclxuXHRcdFx0XHQvLyBNYXJrIGZpcnN0IGl0ZW0gYXMgc2VsZWN0ZWQtb3B0aW9uIC0gdGhpcyBpcyB3aGVyZSB3ZSBzdG9yZSBzdGF0ZSBmb3IgdGhlIHN0eWxlZCBzZWxlY3QgYm94XHJcblx0XHRcdFx0Ly8gYXJpYS1oaWRkZW49dHJ1ZSBzbyBzY3JlZW4gcmVhZGVycyBpZ25vcmUgdGhlIHN0eWxlcyBzZWxleHQgYm94IGluIGZhdm9yIG9mIHRoZSByZWFsIG9uZSAod2hpY2ggaXMgdmlzaWJsZSBieSBkZWZhdWx0KVxyXG5cdFx0XHRcdHNlbGVjdGVkT3B0aW9uSFRNTCA9ICc8ZGl2IGNsYXNzPVwic3Mtc2VsZWN0ZWQtb3B0aW9uXCIgdGFiaW5kZXg9XCIwXCIgZGF0YS12YWx1ZT1cIicgKyB2YWx1ZSArICdcIj4nICsgdGV4dCArICc8L2Rpdj4nXHJcblx0XHRcdH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZWFsT3B0aW9uLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjc3NDbGFzcyArPSAnIGRpc2FibGVkJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ29udGludWUgYnVpbGRpbmcgb3B0aW9uc0hUTUxcclxuXHRcdFx0b3B0aW9uc0hUTUwgKz0gJzxkaXYgY2xhc3M9XCInICsgY3NzQ2xhc3MgKyAnXCIgZGF0YS12YWx1ZT1cIicgKyB2YWx1ZSArICdcIj4nICsgdGV4dCArICc8L2Rpdj4nO1xyXG5cdFx0fSk7XHJcblx0XHRvcHRpb25zSFRNTCArPSAnPC9kaXY+JztcclxuXHRcdHN0eWxlU2VsZWN0SFRNTCArPSBzZWxlY3RlZE9wdGlvbkhUTUwgKz0gb3B0aW9uc0hUTUwgKz0gJzwvZGl2Pic7XHJcblx0XHQvLyBBbmQgYWRkIG91dCBzdHlsZWQgc2VsZWN0IGp1c3QgYWZ0ZXIgdGhlIHJlYWwgc2VsZWN0XHJcblx0XHRyZWFsU2VsZWN0Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBzdHlsZVNlbGVjdEhUTUwpO1xyXG5cclxuXHRcdHZhciBzdHlsZWRTZWxlY3QgPSBxdWVyeSgnLnN0eWxlLXNlbGVjdFtkYXRhLXNzLXV1aWQ9XCInK3V1aWQrJ1wiXScpO1xyXG5cdFx0dmFyIHN0eWxlU2VsZWN0T3B0aW9ucyA9IHN0eWxlZFNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCcuc3Mtb3B0aW9uJyk7XHJcblx0XHR2YXIgc2VsZWN0ZWRPcHRpb24gPSBzdHlsZWRTZWxlY3QucXVlcnlTZWxlY3RvcignLnNzLXNlbGVjdGVkLW9wdGlvbicpO1xyXG5cclxuXHRcdHZhciBjaGFuZ2VSZWFsU2VsZWN0Qm94ID0gZnVuY3Rpb24obmV3VmFsdWUsIG5ld0xhYmVsKSB7XHJcblx0XHRcdC8vIENsb3NlIHN0eWxlZFNlbGVjdFxyXG5cdFx0XHRzdHlsZWRTZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG5cclxuXHRcdFx0Ly8gVXBkYXRlIHN0eWxlZCB2YWx1ZVxyXG5cdFx0XHRzZWxlY3RlZE9wdGlvbi50ZXh0Q29udGVudCA9IG5ld0xhYmVsO1xyXG5cdFx0XHRzZWxlY3RlZE9wdGlvbi5kYXRhc2V0LnZhbHVlID0gbmV3VmFsdWU7XHJcblxyXG5cdFx0XHQvLyBVcGRhdGUgdGhlICd0aWNrJyB0aGF0IHNob3dzIHRoZSBvcHRpb24gd2l0aCB0aGUgY3VycmVudCB2YWx1ZVxyXG5cdFx0XHRzdHlsZVNlbGVjdE9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihzdHlsZVNlbGVjdE9wdGlvbil7XHJcblx0XHRcdFx0aWYgKCBzdHlsZVNlbGVjdE9wdGlvbi5kYXRhc2V0LnZhbHVlID09PSBuZXdWYWx1ZSkge1xyXG5cdFx0XHRcdFx0c3R5bGVTZWxlY3RPcHRpb24uY2xhc3NMaXN0LmFkZCgndGlja2VkJylcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3R5bGVTZWxlY3RPcHRpb24uY2xhc3NMaXN0LnJlbW92ZSgndGlja2VkJylcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gVXBkYXRlIHJlYWwgc2VsZWN0IGJveFxyXG5cdFx0XHRyZWFsU2VsZWN0LnZhbHVlID0gbmV3VmFsdWU7XHJcblxyXG5cdFx0XHQvLyBTZW5kICdjaGFuZ2UnIGV2ZW50IHRvIHJlYWwgc2VsZWN0IC0gdG8gdHJpZ2dlciBhbnkgY2hhbmdlIGV2ZW50IGxpc3RlbmVyc1xyXG5cdFx0XHR2YXIgY2hhbmdlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScpO1xyXG5cdFx0XHRyZWFsU2VsZWN0LmRpc3BhdGNoRXZlbnQoY2hhbmdlRXZlbnQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBDaGFuZ2UgcmVhbCBzZWxlY3QgYm94IHdoZW4gYSBzdHlsZWQgb3B0aW9uIGlzIGNsaWNrZWRcclxuXHRcdHN0eWxlU2VsZWN0T3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHVudXNlZCwgaW5kZXgpe1xyXG5cdFx0XHR2YXIgc3R5bGVTZWxlY3RPcHRpb24gPSBzdHlsZVNlbGVjdE9wdGlvbnMuaXRlbShpbmRleCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3R5bGVTZWxlY3RPcHRpb24uY2xhc3NOYW1lLm1hdGNoKC9cXGJkaXNhYmxlZFxcYi8pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0eWxlU2VsZWN0T3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcclxuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gZXYudGFyZ2V0LFxyXG5cdFx0XHRcdFx0c3R5bGVkU2VsZWN0Qm94ID0gdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSxcclxuXHRcdFx0XHRcdHV1aWQgPSBzdHlsZWRTZWxlY3RCb3guZ2V0QXR0cmlidXRlKCdkYXRhLXNzLXV1aWQnKSxcclxuXHRcdFx0XHRcdG5ld1ZhbHVlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpLFxyXG5cdFx0XHRcdFx0bmV3TGFiZWwgPSB0YXJnZXQudGV4dENvbnRlbnQ7XHJcblxyXG5cdFx0XHRcdGNoYW5nZVJlYWxTZWxlY3RCb3gobmV3VmFsdWUsIG5ld0xhYmVsKVxyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBUaWNrIGFuZCBoaWdobGlnaHQgdGhlIG9wdGlvbiB0aGF0J3MgY3VycmVudGx5IGluIHVzZVxyXG5cdFx0XHRpZiAoIHN0eWxlU2VsZWN0T3B0aW9uLmRhdGFzZXQudmFsdWUgPT09IHJlYWxTZWxlY3QudmFsdWUgKSB7XHJcblx0XHRcdFx0aGlnaGxpZ2h0ZWRPcHRpb25JbmRleCA9IGluZGV4O1xyXG5cdFx0XHRcdHN0eWxlU2VsZWN0T3B0aW9uLmNsYXNzTGlzdC5hZGQoJ3RpY2tlZCcpO1xyXG5cdFx0XHRcdHN0eWxlU2VsZWN0T3B0aW9uLmNsYXNzTGlzdC5hZGQoJ2hpZ2hsaWdodGVkJylcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSW1wb3J0YW50OiB3ZSBjYW4ndCB1c2UgJzpob3ZlcicgYXMgdGhlIGtleWJvYXJkIGFuZCBkZWZhdWx0IHZhbHVlIGNhbiBhbHNvIHNldCB0aGUgaGlnaGxpZ2h0XHJcblx0XHRcdHN0eWxlU2VsZWN0T3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGV2KXtcclxuXHRcdFx0XHRzdHlsZVNlbGVjdE9wdGlvbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMuZm9yRWFjaChmdW5jdGlvbihzaWJsaW5nLCBpbmRleCl7XHJcblx0XHRcdFx0XHRpZiAoIHNpYmxpbmcgPT09IGV2LnRhcmdldCApIHtcclxuXHRcdFx0XHRcdFx0c2libGluZy5jbGFzc0xpc3QuYWRkKCdoaWdobGlnaHRlZCcpO1xyXG5cdFx0XHRcdFx0XHRoaWdobGlnaHRlZE9wdGlvbkluZGV4ID0gaW5kZXg7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2hsaWdodGVkJylcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHJcblx0XHR2YXIgY2xvc2VBbGxTdHlsZVNlbGVjdHMgPSBmdW5jdGlvbihleGNlcHRpb24pe1xyXG5cdFx0XHRxdWVyeUFsbCgnLnN0eWxlLXNlbGVjdCcpLmZvckVhY2goZnVuY3Rpb24oc3R5bGVTZWxlY3RFbCkge1xyXG5cdFx0XHRcdGlmICggc3R5bGVTZWxlY3RFbCAhPT0gZXhjZXB0aW9uICkge1xyXG5cdFx0XHRcdFx0c3R5bGVTZWxlY3RFbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIHRvZ2dsZVN0eWxlZFNlbGVjdCA9IGZ1bmN0aW9uKHN0eWxlZFNlbGVjdEJveCl7XHJcblx0XHRcdGlmICggISBzdHlsZWRTZWxlY3RCb3guY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykgKSB7XHJcblx0XHRcdFx0Ly8gSWYgd2UncmUgY2xvc2VkIGFuZCBhYm91dCB0byBvcGVuLCBjbG9zZSBvdGhlciBzdHlsZSBzZWxlY3RzIG9uIHRoZSBwYWdlXHJcblx0XHRcdFx0Y2xvc2VBbGxTdHlsZVNlbGVjdHMoc3R5bGVkU2VsZWN0Qm94KTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBUaGVuIHRvZ2dsZSBvcGVuL2Nsb3NlXHJcblx0XHRcdHN0eWxlZFNlbGVjdEJveC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIFdoZW4gYSBzdHlsZWQgc2VsZWN0IGJveCBpcyBjbGlja2VkXHJcblx0XHR2YXIgc3R5bGVkU2VsZWN0ZWRPcHRpb24gPSBxdWVyeSgnLnN0eWxlLXNlbGVjdFtkYXRhLXNzLXV1aWQ9XCInICsgdXVpZCArICdcIl0gLnNzLXNlbGVjdGVkLW9wdGlvbicpO1xyXG5cdFx0c3R5bGVkU2VsZWN0ZWRPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xyXG5cdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRldi5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0dG9nZ2xlU3R5bGVkU2VsZWN0KGV2LnRhcmdldC5wYXJlbnROb2RlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEtleWJvYXJkIGhhbmRsaW5nXHJcblx0XHRzdHlsZWRTZWxlY3RlZE9wdGlvbi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZXYpIHtcclxuXHRcdFx0dmFyIHN0eWxlZFNlbGVjdEJveCA9IGV2LnRhcmdldC5wYXJlbnROb2RlO1xyXG5cclxuXHRcdFx0c3dpdGNoIChldi5rZXlDb2RlKSB7XHJcblx0XHRcdFx0Y2FzZSBLRVlDT0RFUy5TUEFDRTpcclxuXHRcdFx0XHRcdC8vIFNwYWNlIHNob3dzIGFuZCBoaWRlcyBzdHlsZXMgc2VsZWN0IGJveGVzXHJcblx0XHRcdFx0XHR0b2dnbGVTdHlsZWRTZWxlY3Qoc3R5bGVkU2VsZWN0Qm94KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgS0VZQ09ERVMuRE9XTjpcclxuXHRcdFx0XHRjYXNlIEtFWUNPREVTLlVQOlxyXG5cdFx0XHRcdFx0Ly8gTW92ZSB0aGUgaGlnaGxpZ2h0IHVwIGFuZCBkb3duXHJcblx0XHRcdFx0XHRpZiAoICEgc3R5bGVkU2VsZWN0Qm94LmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpICkge1xyXG5cdFx0XHRcdFx0XHQvLyBJZiBzdHlsZSBzZWxlY3QgaXMgbm90IG9wZW4sIHVwL2Rvd24gc2hvdWxkIG9wZW4gaXQuXHJcblx0XHRcdFx0XHRcdHRvZ2dsZVN0eWxlZFNlbGVjdChzdHlsZWRTZWxlY3RCb3gpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Ly8gSWYgc3R5bGUgc2VsZWN0IGlzIGFscmVhZHkgb3BlbiwgdGhlc2Ugc2hvdWxkIGNoYW5nZSB3aGF0IHRoZSBoaWdobGlnaHRlZCBvcHRpb24gaXNcclxuXHRcdFx0XHRcdFx0aWYgKCBldi5rZXlDb2RlID09PSBLRVlDT0RFUy5VUCApIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBVcCBhcnJvdyBtb3ZlcyBlYXJsaWVyIGluIGxpc3RcclxuXHRcdFx0XHRcdFx0XHRpZiAoIGhpZ2hsaWdodGVkT3B0aW9uSW5kZXggIT09IDAgKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRoaWdobGlnaHRlZE9wdGlvbkluZGV4ID0gaGlnaGxpZ2h0ZWRPcHRpb25JbmRleCAtIDFcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gRG93biBhcnJvdyBtb3ZlcyBsYXRlciBpbiBsaXN0XHJcblx0XHRcdFx0XHRcdFx0aWYgKCBoaWdobGlnaHRlZE9wdGlvbkluZGV4IDwgaGlnaGxpZ2h0ZWRPcHRpb25JbmRleE1heCApIHtcclxuXHRcdFx0XHRcdFx0XHRcdGhpZ2hsaWdodGVkT3B0aW9uSW5kZXggPSBoaWdobGlnaHRlZE9wdGlvbkluZGV4ICsgMVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRzdHlsZVNlbGVjdE9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihvcHRpb24sIGluZGV4KXtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIGluZGV4ID09PSBoaWdobGlnaHRlZE9wdGlvbkluZGV4ICkge1xyXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uLmNsYXNzTGlzdC5hZGQoJ2hpZ2hsaWdodGVkJylcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2hsaWdodGVkJylcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZXYuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHQvLyBVc2VyIGhhcyBwaWNrZWQgYW4gaXRlbSBmcm9tIHRoZSBrZXlib2FyZFxyXG5cdFx0XHRcdGNhc2UgS0VZQ09ERVMuRU5URVI6XHJcblx0XHRcdFx0XHR2YXIgaGlnaGxpZ2h0ZWRPcHRpb24gPSBzdHlsZWRTZWxlY3RlZE9wdGlvbi5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcy1vcHRpb24nKVtoaWdobGlnaHRlZE9wdGlvbkluZGV4XSxcclxuXHRcdFx0XHRcdFx0bmV3VmFsdWUgPSBoaWdobGlnaHRlZE9wdGlvbi5kYXRhc2V0LnZhbHVlLFxyXG5cdFx0XHRcdFx0XHRuZXdMYWJlbCA9IGhpZ2hsaWdodGVkT3B0aW9uLnRleHRDb250ZW50O1xyXG5cclxuXHRcdFx0XHRcdGNoYW5nZVJlYWxTZWxlY3RCb3gobmV3VmFsdWUsIG5ld0xhYmVsKTtcclxuXHRcdFx0XHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldi5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBDbGlja2luZyBvdXRzaWRlIG9mIHRoZSBzdHlsZWQgc2VsZWN0IGJveCBjbG9zZXMgYW55IG9wZW4gc3R5bGVkIHNlbGVjdCBib3hlc1xyXG5cdFx0cXVlcnkoJ2JvZHknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcclxuXHJcblx0XHRcdGlmICggISBpc0FuY2VzdG9yT2YoZXYudGFyZ2V0LCAnLnN0eWxlLXNlbGVjdCcsIHRydWUpICkge1xyXG5cdFx0XHRcdGNsb3NlQWxsU3R5bGVTZWxlY3RzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblxyXG5cdH07XHJcblxyXG4vLyBDbG9zZSBVTUQgbW9kdWxlXHJcbn0pKTtcclxuXHJcbiJdfQ==
