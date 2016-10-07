(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _styleSelect = require('styleSelect');

var _styleSelect2 = _interopRequireDefault(_styleSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _styleSelect2.default)('.form__select');

// Lambda func to handle form funcs
(function () {
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
})();

},{"styleSelect":2}],2:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvYXBwLmpzIiwibm9kZV9tb2R1bGVzL3N0eWxlU2VsZWN0L2pzL3N0eWxlc2VsZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUEsMkJBQVksZUFBWjs7QUFFQTtBQUNBLENBQUMsWUFBTTtBQUNIO0FBQ0EsUUFBTSxVQUFVLFNBQVMsZ0JBQVQsQ0FBMEIsK0JBQTFCLENBQWhCOztBQUVBO0FBQ0EsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFFBQVEsTUFBNUIsRUFBb0MsR0FBcEMsRUFBeUM7QUFDckM7QUFDQSxZQUFJLEtBQUssUUFBUSxDQUFSLENBQVQ7QUFDQTtBQUNBLFdBQUcsZ0JBQUgsQ0FBb0IsT0FBcEIsRUFBNkIsVUFBQyxLQUFELEVBQVc7QUFDcEM7QUFDQSxnQkFBTSxTQUFTLE1BQU0sTUFBckI7QUFDQTtBQUNBLGdCQUFJLE9BQU8sS0FBWCxFQUFrQjtBQUNkO0FBQ0Esb0JBQUksQ0FBQyxPQUFPLFNBQVAsQ0FBaUIsUUFBakIsQ0FBMEIsaUJBQTFCLENBQUwsRUFBbUQ7QUFDL0M7QUFDQSwyQkFBTyxTQUFQLENBQWlCLEdBQWpCLENBQXFCLGlCQUFyQjtBQUNIO0FBQ0w7QUFDQyxhQVBELE1BT087QUFDSDtBQUNBLG9CQUFJLE9BQU8sU0FBUCxDQUFpQixRQUFqQixDQUEwQixpQkFBMUIsQ0FBSixFQUFrRDtBQUM5QztBQUNBLDJCQUFPLFNBQVAsQ0FBaUIsTUFBakIsQ0FBd0IsaUJBQXhCO0FBQ0g7QUFDSjtBQUNKLFNBbEJEO0FBbUJIO0FBRUosQ0E5QkQ7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgc3R5bGVTZWxlY3QgZnJvbSAnc3R5bGVTZWxlY3QnO1xuXG5zdHlsZVNlbGVjdCgnLmZvcm1fX3NlbGVjdCcpO1xuXG4vLyBMYW1iZGEgZnVuYyB0byBoYW5kbGUgZm9ybSBmdW5jc1xuKCgpID0+IHtcbiAgICAvLyBHZXQgdGhlIHRleHQgaW5wdXR0aW5nIGZvcm0gZWxzXG4gICAgY29uc3QgZm9ybUVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtX19pbnB1dCwgLmZvcm1fX3RleHRhcmVhJyk7XG4gICAgXG4gICAgLy8gTG9vcCB0aGUgZm9ybSBlbHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1FbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gQ2FjaGUgdGhlIGN1cnJlbnQgZWxlbWVudFxuICAgICAgICBsZXQgZWwgPSBmb3JtRWxzW2ldO1xuICAgICAgICAvLyBUcmFjayAnaW5wdXQnIGV2ZW50cyBvbiBlbGVtZW50XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBDYWNoZSB0aGUgZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAvLyBJZiB0YXJnZXQgaGFzIGEgdmFsdWVcbiAgICAgICAgICAgIGlmICh0YXJnZXQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBBbmQgaWYgY2xhc3NMaXN0IGRvZXNuJ3QgY29udGFpbiBhY3RpdmUgY2xhc3NcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Zvcm1fX2hhcy12YWx1ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBhY3RpdmUgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2Zvcm1fX2hhcy12YWx1ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEVsc2UgaWYgdGFyZ2V0IGRvZXNuJ3QgaGF2ZSBhIHZhbHVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIElmIGNsYXNzTGlzdCBjb250YWlucyBhY3RpdmUgY2xhc3NcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZm9ybV9faGFzLXZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzc1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZm9ybV9faGFzLXZhbHVlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59KSgpO1xuIiwiLy8gVU1EIG1vZHVsZSBmcm9tIEZyb20gaHR0cHM6Ly9naXRodWIuY29tL3VtZGpzL3VtZC9ibG9iL21hc3Rlci9yZXR1cm5FeHBvcnRzLmpzXHJcbi8vIEZyb20gJ2lmIHRoZSBtb2R1bGUgaGFzIG5vIGRlcGVuZGVuY2llcycgZXhhbXBsZS5cclxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XHJcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxyXG4gICAgICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIC8vIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxyXG4gICAgICAgIC8vIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxyXG4gICAgICAgIC8vIGxpa2UgTm9kZS5cclxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzIChyb290IGlzIHdpbmRvdylcclxuICAgICAgICByb290LnJldHVybkV4cG9ydHMgPSBmYWN0b3J5KCk7XHJcbiAgfVxyXG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcclxuLy8gRW5kIG9mIFVNRCBtb2R1bGVcclxuXHJcblx0Ly8gUXVpY2sgYWxpYXNlcyBhbmQgcG9seWZpbGxzIGlmIG5lZWRlZFxyXG5cdHZhciBxdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudCk7XHJcblx0dmFyIHF1ZXJ5QWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbC5iaW5kKGRvY3VtZW50KTtcclxuXHJcblx0dmFyIEtFWUNPREVTID0ge1xyXG5cdFx0U1BBQ0U6IDMyLFxyXG5cdFx0VVA6IDM4LFxyXG5cdFx0RE9XTjogNDAsXHJcblx0XHRFTlRFUjogMTNcclxuXHR9O1xyXG5cclxuXHRpZiAoICEgTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2ggKSB7XHJcblx0XHROb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xyXG5cdH1cclxuXHRpZiAoICEgSFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLmZvckVhY2ggKSB7XHJcblx0XHRIVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUuZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xyXG5cdH1cclxuXHRpZiAoICEgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyApIHtcclxuXHRcdC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC5tYXRjaGVzXHJcblx0XHRFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUubW96TWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS5vTWF0Y2hlc1NlbGVjdG9yXHJcblx0fVxyXG5cclxuXHQvLyBJRSA5LTExIEN1c3RvbUV2ZW50IHBvbHlmaWxsXHJcblx0Ly8gRnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnRcclxuXHR2YXIgQ3VzdG9tRXZlbnQgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBwYXJhbXMgKSB7XHJcblx0XHRwYXJhbXMgPSBwYXJhbXMgfHwgeyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkIH07XHJcblx0XHR2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCggJ0N1c3RvbUV2ZW50JyApO1xyXG5cdFx0ZXZlbnQuaW5pdEN1c3RvbUV2ZW50KCBldmVudE5hbWUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCApO1xyXG5cdFx0cmV0dXJuIGV2ZW50O1xyXG5cdH07XHJcblx0Q3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZTtcclxuXHR3aW5kb3cuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDtcclxuXHJcblx0Ly8gSUUxMCBkYXRhc2V0IHBvbHlmaWxsXHJcblx0Ly8gRnJvbSBodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2JyZXR0ejkvNDA5Mzc2Ni9yYXcvYmEzMWEwNWU3Y2UyMWFmNjdjNmNhZmVlOWIzZjQzOWM4NmU5NWIwMS9odG1sNS1kYXRhc2V0LmpzXHJcblx0aWYgKCFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGF0YXNldCAmJlxyXG5cdFx0XHQgLy8gRkYgaXMgZW1wdHkgd2hpbGUgSUUgZ2l2ZXMgZW1wdHkgb2JqZWN0XHJcblx0XHRcdCghT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFbGVtZW50LnByb3RvdHlwZSwgJ2RhdGFzZXQnKSAgfHxcclxuXHRcdFx0IU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRWxlbWVudC5wcm90b3R5cGUsICdkYXRhc2V0JykuZ2V0KVxyXG5cdFx0KSB7XHJcblx0XHR2YXIgcHJvcERlc2NyaXB0b3IgPSB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdFx0XHR2YXIgaSxcclxuXHRcdFx0XHRcdHRoYXQgPSB0aGlzLFxyXG5cdFx0XHRcdFx0SFRNTDVfRE9NU3RyaW5nTWFwLFxyXG5cdFx0XHRcdFx0YXR0clZhbCwgYXR0ck5hbWUsIHByb3BOYW1lLFxyXG5cdFx0XHRcdFx0YXR0cmlidXRlLFxyXG5cdFx0XHRcdFx0YXR0cmlidXRlcyA9IHRoaXMuYXR0cmlidXRlcyxcclxuXHRcdFx0XHRcdGF0dHNMZW5ndGggPSBhdHRyaWJ1dGVzLmxlbmd0aCxcclxuXHRcdFx0XHRcdHRvVXBwZXJDYXNlID0gZnVuY3Rpb24gKG4wKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBuMC5jaGFyQXQoMSkudG9VcHBlckNhc2UoKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRnZXR0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHNldHRlciA9IGZ1bmN0aW9uIChhdHRyTmFtZSwgdmFsdWUpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSA/XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIHZhbHVlKSA6XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR0cnkgeyAvLyBTaW11bGF0ZSBET01TdHJpbmdNYXAgdy9hY2Nlc3NvciBzdXBwb3J0XHJcblx0XHRcdFx0XHQvLyBUZXN0IHNldHRpbmcgYWNjZXNzb3Igb24gbm9ybWFsIG9iamVjdFxyXG5cdFx0XHRcdFx0KHt9KS5fX2RlZmluZUdldHRlcl9fKCd0ZXN0JywgZnVuY3Rpb24gKCkge30pO1xyXG5cdFx0XHRcdFx0SFRNTDVfRE9NU3RyaW5nTWFwID0ge307XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlMSkgeyAvLyBVc2UgYSBET00gb2JqZWN0IGZvciBJRThcclxuXHRcdFx0XHRcdEhUTUw1X0RPTVN0cmluZ01hcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgYXR0c0xlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xyXG5cdFx0XHRcdFx0Ly8gRml4OiBUaGlzIHRlc3QgcmVhbGx5IHNob3VsZCBhbGxvdyBhbnkgWE1MIE5hbWUgd2l0aG91dFxyXG5cdFx0XHRcdFx0Ly8gICAgICAgICBjb2xvbnMgKGFuZCBub24tdXBwZXJjYXNlIGZvciBYSFRNTClcclxuXHRcdFx0XHRcdGlmIChhdHRyaWJ1dGUgJiYgYXR0cmlidXRlLm5hbWUgJiZcclxuXHRcdFx0XHRcdFx0KC9eZGF0YS1cXHdbXFx3XFwtXSokLykudGVzdChhdHRyaWJ1dGUubmFtZSkpIHtcclxuXHRcdFx0XHRcdFx0YXR0clZhbCA9IGF0dHJpYnV0ZS52YWx1ZTtcclxuXHRcdFx0XHRcdFx0YXR0ck5hbWUgPSBhdHRyaWJ1dGUubmFtZTtcclxuXHRcdFx0XHRcdFx0Ly8gQ2hhbmdlIHRvIENhbWVsQ2FzZVxyXG5cdFx0XHRcdFx0XHRwcm9wTmFtZSA9IGF0dHJOYW1lLnN1YnN0cig1KS5yZXBsYWNlKC8tLi9nLCB0b1VwcGVyQ2FzZSk7XHJcblx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUw1X0RPTVN0cmluZ01hcCwgcHJvcE5hbWUsIHtcclxuXHRcdFx0XHRcdFx0XHRcdGVudW1lcmFibGU6IHRoaXMuZW51bWVyYWJsZSxcclxuXHRcdFx0XHRcdFx0XHRcdGdldDogZ2V0dGVyLmJpbmQoYXR0clZhbCB8fCAnJyksXHJcblx0XHRcdFx0XHRcdFx0XHRzZXQ6IHNldHRlci5iaW5kKHRoYXQsIGF0dHJOYW1lKVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGNhdGNoIChlMikgeyAvLyBpZiBhY2Nlc3NvcnMgYXJlIG5vdCB3b3JraW5nXHJcblx0XHRcdFx0XHRcdFx0SFRNTDVfRE9NU3RyaW5nTWFwW3Byb3BOYW1lXSA9IGF0dHJWYWw7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIEhUTUw1X0RPTVN0cmluZ01hcDtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHRyeSB7XHJcblx0XHRcdC8vIEZGIGVudW1lcmF0ZXMgb3ZlciBlbGVtZW50J3MgZGF0YXNldCwgYnV0IG5vdFxyXG5cdFx0XHQvLyAgIEVsZW1lbnQucHJvdG90eXBlLmRhdGFzZXQ7IElFOSBpdGVyYXRlcyBvdmVyIGJvdGhcclxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KEVsZW1lbnQucHJvdG90eXBlLCAnZGF0YXNldCcsIHByb3BEZXNjcmlwdG9yKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cHJvcERlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlOyAvLyBJRTggZG9lcyBub3QgYWxsb3cgc2V0dGluZyB0byB0cnVlXHJcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFbGVtZW50LnByb3RvdHlwZSwgJ2RhdGFzZXQnLCBwcm9wRGVzY3JpcHRvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBSZXR1cm4gdHJ1ZSBpZiBhbnkgYW5jZXN0b3IgbWF0Y2hlcyBzZWxlY3RvclxyXG5cdC8vIEJvcnJvd2VkIGZyb20gYW5jZXN0b3JNYXRjaGVzKCkgZnJvbSBhZ2F2ZS5qcyAoTUlUKVxyXG5cdHZhciBpc0FuY2VzdG9yT2YgPSBmdW5jdGlvbihlbGVtZW50LCBzZWxlY3RvciwgaW5jbHVkZVNlbGYpIHtcclxuXHRcdHZhciBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XHJcblx0XHRpZiAoIGluY2x1ZGVTZWxmICYmIGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikgKSB7XHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHR9XHJcblx0XHQvLyBXaGlsZSBwYXJlbnRzIGFyZSAnZWxlbWVudCcgdHlwZSBub2Rlc1xyXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvRE9NL05vZGUubm9kZVR5cGVcclxuXHRcdHdoaWxlICggcGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSAmJiBwYXJlbnQubm9kZVR5cGUgPT09IDEgKSB7XHJcblx0XHRcdGlmICggcGFyZW50Lm1hdGNoZXMoc2VsZWN0b3IpICkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fTtcclxuXHJcblxyXG5cdC8vIFVzZWQgdG8gbWF0Y2ggc2VsZWN0IGJveGVzIHRvIHRoZWlyIHN0eWxlIHNlbGVjdCBwYXJ0bmVyc1xyXG5cdHZhciBtYWtlVVVJRCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gJ3NzLXh4eHgteHh4eC14eHh4LXh4eHgteHh4eCcucmVwbGFjZSgveC9nLCBmdW5jdGlvbiAoYykge1xyXG5cdFx0XHR2YXIgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDAsIHYgPSBjID09ICd4JyA/IHIgOiByICYgMHgzIHwgMHg4O1xyXG5cdFx0XHRyZXR1cm4gdi50b1N0cmluZygxNik7XHJcblx0XHR9KVxyXG5cdH07XHJcblxyXG5cclxuXHQvLyBUaGUgJ3N0eWxlU2VsZWN0JyBtYWluIGZ1bmN0aW9uXHJcblx0Ly8gc2VsZWN0b3I6U3RyaW5nIC0gQ1NTIHNlbGVjdG9yIGZvciB0aGUgc2VsZWN0IGJveCB0byBzdHlsZVxyXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xyXG5cclxuXHRcdC8vIFVzZSBuYXRpdmUgc2VsZWN0cyAod2hpY2ggcG9wIHVwIGxhcmdlIG5hdGl2ZSBVSXMgdG8gZ28gdGhyb3VnaCB0aGUgb3B0aW9ucyApIG9uIGlPUy9BbmRyb2lkXHJcblx0XHRpZiAoIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goIC9pUGFkfGlQaG9uZXxBbmRyb2lkL2kgKSApIHtcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHJlYWxTZWxlY3QgPSB0eXBlb2Ygc2VsZWN0b3IgPT0gJ29iamVjdCcgPyBzZWxlY3RvciA6IHF1ZXJ5KHNlbGVjdG9yKSxcclxuXHRcdFx0cmVhbE9wdGlvbnMgPSByZWFsU2VsZWN0LmNoaWxkcmVuLFxyXG5cdFx0XHRzZWxlY3RlZEluZGV4ID0gcmVhbFNlbGVjdC5zZWxlY3RlZEluZGV4LFxyXG5cdFx0XHR1dWlkID0gbWFrZVVVSUQoKSxcclxuXHRcdFx0c3R5bGVTZWxlY3RIVE1MID0gJzxkaXYgY2xhc3M9XCJzdHlsZS1zZWxlY3RcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkYXRhLXNzLXV1aWQ9XCInICsgdXVpZCArICdcIj4nO1xyXG5cclxuXHRcdC8vIFRoZSBpbmRleCBvZiB0aGUgaXRlbSB0aGF0J3MgYmVpbmcgaGlnaGxpZ2h0ZWQgYnkgdGhlIG1vdXNlIG9yIGtleWJvYXJkXHJcblx0XHR2YXIgaGlnaGxpZ2h0ZWRPcHRpb25JbmRleDtcclxuXHRcdHZhciBoaWdobGlnaHRlZE9wdGlvbkluZGV4TWF4ID0gcmVhbE9wdGlvbnMubGVuZ3RoIC0gMTtcclxuXHJcblx0XHRyZWFsU2VsZWN0LnNldEF0dHJpYnV0ZSgnZGF0YS1zcy11dWlkJywgdXVpZCk7XHJcblx0XHQvLyBFdmVuIHRob3VnaCB0aGUgZWxlbWVudCBpcyBkaXNwbGF5OiBub25lLCBhMTF5IHVzZXJzIHNob3VsZCBzdGlsbCBzZWUgaXQuXHJcblx0XHQvLyBBY2NvcmRpbmcgdG8gaHR0cDovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEvc3RhdGVzX2FuZF9wcm9wZXJ0aWVzI2FyaWEtaGlkZGVuXHJcblx0XHQvLyBzb21lIGJyb3dzZXJzIG1heSBoYXZlIGJ1Z3Mgd2l0aCB0aGlzIGJ1dCBmdXR1cmUgaW1wbGVtZW50YXRpb24gbWF5IGltcHJvdmVcclxuXHRcdHJlYWxTZWxlY3Quc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIFwiZmFsc2VcIik7XHJcblxyXG5cdFx0Ly8gQnVpbGQgc3R5bGVkIGNsb25lcyBvZiBhbGwgdGhlIHJlYWwgb3B0aW9uc1xyXG5cdFx0dmFyIHNlbGVjdGVkT3B0aW9uSFRNTDtcclxuXHRcdHZhciBvcHRpb25zSFRNTCA9ICc8ZGl2IGNsYXNzPVwic3MtZHJvcGRvd25cIj4nO1xyXG5cdFx0cmVhbE9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihyZWFsT3B0aW9uLCBpbmRleCl7XHJcblx0XHRcdHZhciB0ZXh0ID0gcmVhbE9wdGlvbi50ZXh0Q29udGVudCxcclxuXHRcdFx0XHR2YWx1ZSA9IHJlYWxPcHRpb24uZ2V0QXR0cmlidXRlKCd2YWx1ZScpIHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgY3NzQ2xhc3MgPSAnc3Mtb3B0aW9uJztcclxuXHJcblx0XHRcdGlmIChpbmRleCA9PT0gc2VsZWN0ZWRJbmRleCkge1xyXG5cdFx0XHRcdC8vIE1hcmsgZmlyc3QgaXRlbSBhcyBzZWxlY3RlZC1vcHRpb24gLSB0aGlzIGlzIHdoZXJlIHdlIHN0b3JlIHN0YXRlIGZvciB0aGUgc3R5bGVkIHNlbGVjdCBib3hcclxuXHRcdFx0XHQvLyBhcmlhLWhpZGRlbj10cnVlIHNvIHNjcmVlbiByZWFkZXJzIGlnbm9yZSB0aGUgc3R5bGVzIHNlbGV4dCBib3ggaW4gZmF2b3Igb2YgdGhlIHJlYWwgb25lICh3aGljaCBpcyB2aXNpYmxlIGJ5IGRlZmF1bHQpXHJcblx0XHRcdFx0c2VsZWN0ZWRPcHRpb25IVE1MID0gJzxkaXYgY2xhc3M9XCJzcy1zZWxlY3RlZC1vcHRpb25cIiB0YWJpbmRleD1cIjBcIiBkYXRhLXZhbHVlPVwiJyArIHZhbHVlICsgJ1wiPicgKyB0ZXh0ICsgJzwvZGl2PidcclxuXHRcdFx0fVxyXG5cclxuICAgICAgICAgICAgaWYgKHJlYWxPcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGNzc0NsYXNzICs9ICcgZGlzYWJsZWQnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDb250aW51ZSBidWlsZGluZyBvcHRpb25zSFRNTFxyXG5cdFx0XHRvcHRpb25zSFRNTCArPSAnPGRpdiBjbGFzcz1cIicgKyBjc3NDbGFzcyArICdcIiBkYXRhLXZhbHVlPVwiJyArIHZhbHVlICsgJ1wiPicgKyB0ZXh0ICsgJzwvZGl2Pic7XHJcblx0XHR9KTtcclxuXHRcdG9wdGlvbnNIVE1MICs9ICc8L2Rpdj4nO1xyXG5cdFx0c3R5bGVTZWxlY3RIVE1MICs9IHNlbGVjdGVkT3B0aW9uSFRNTCArPSBvcHRpb25zSFRNTCArPSAnPC9kaXY+JztcclxuXHRcdC8vIEFuZCBhZGQgb3V0IHN0eWxlZCBzZWxlY3QganVzdCBhZnRlciB0aGUgcmVhbCBzZWxlY3RcclxuXHRcdHJlYWxTZWxlY3QuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIHN0eWxlU2VsZWN0SFRNTCk7XHJcblxyXG5cdFx0dmFyIHN0eWxlZFNlbGVjdCA9IHF1ZXJ5KCcuc3R5bGUtc2VsZWN0W2RhdGEtc3MtdXVpZD1cIicrdXVpZCsnXCJdJyk7XHJcblx0XHR2YXIgc3R5bGVTZWxlY3RPcHRpb25zID0gc3R5bGVkU2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcy1vcHRpb24nKTtcclxuXHRcdHZhciBzZWxlY3RlZE9wdGlvbiA9IHN0eWxlZFNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuc3Mtc2VsZWN0ZWQtb3B0aW9uJyk7XHJcblxyXG5cdFx0dmFyIGNoYW5nZVJlYWxTZWxlY3RCb3ggPSBmdW5jdGlvbihuZXdWYWx1ZSwgbmV3TGFiZWwpIHtcclxuXHRcdFx0Ly8gQ2xvc2Ugc3R5bGVkU2VsZWN0XHJcblx0XHRcdHN0eWxlZFNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblxyXG5cdFx0XHQvLyBVcGRhdGUgc3R5bGVkIHZhbHVlXHJcblx0XHRcdHNlbGVjdGVkT3B0aW9uLnRleHRDb250ZW50ID0gbmV3TGFiZWw7XHJcblx0XHRcdHNlbGVjdGVkT3B0aW9uLmRhdGFzZXQudmFsdWUgPSBuZXdWYWx1ZTtcclxuXHJcblx0XHRcdC8vIFVwZGF0ZSB0aGUgJ3RpY2snIHRoYXQgc2hvd3MgdGhlIG9wdGlvbiB3aXRoIHRoZSBjdXJyZW50IHZhbHVlXHJcblx0XHRcdHN0eWxlU2VsZWN0T3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHN0eWxlU2VsZWN0T3B0aW9uKXtcclxuXHRcdFx0XHRpZiAoIHN0eWxlU2VsZWN0T3B0aW9uLmRhdGFzZXQudmFsdWUgPT09IG5ld1ZhbHVlKSB7XHJcblx0XHRcdFx0XHRzdHlsZVNlbGVjdE9wdGlvbi5jbGFzc0xpc3QuYWRkKCd0aWNrZWQnKVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzdHlsZVNlbGVjdE9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCd0aWNrZWQnKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBVcGRhdGUgcmVhbCBzZWxlY3QgYm94XHJcblx0XHRcdHJlYWxTZWxlY3QudmFsdWUgPSBuZXdWYWx1ZTtcclxuXHJcblx0XHRcdC8vIFNlbmQgJ2NoYW5nZScgZXZlbnQgdG8gcmVhbCBzZWxlY3QgLSB0byB0cmlnZ2VyIGFueSBjaGFuZ2UgZXZlbnQgbGlzdGVuZXJzXHJcblx0XHRcdHZhciBjaGFuZ2VFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJyk7XHJcblx0XHRcdHJlYWxTZWxlY3QuZGlzcGF0Y2hFdmVudChjaGFuZ2VFdmVudCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIENoYW5nZSByZWFsIHNlbGVjdCBib3ggd2hlbiBhIHN0eWxlZCBvcHRpb24gaXMgY2xpY2tlZFxyXG5cdFx0c3R5bGVTZWxlY3RPcHRpb25zLmZvckVhY2goZnVuY3Rpb24odW51c2VkLCBpbmRleCl7XHJcblx0XHRcdHZhciBzdHlsZVNlbGVjdE9wdGlvbiA9IHN0eWxlU2VsZWN0T3B0aW9ucy5pdGVtKGluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdHlsZVNlbGVjdE9wdGlvbi5jbGFzc05hbWUubWF0Y2goL1xcYmRpc2FibGVkXFxiLykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3R5bGVTZWxlY3RPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xyXG5cdFx0XHRcdHZhciB0YXJnZXQgPSBldi50YXJnZXQsXHJcblx0XHRcdFx0XHRzdHlsZWRTZWxlY3RCb3ggPSB0YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLFxyXG5cdFx0XHRcdFx0dXVpZCA9IHN0eWxlZFNlbGVjdEJveC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3MtdXVpZCcpLFxyXG5cdFx0XHRcdFx0bmV3VmFsdWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJyksXHJcblx0XHRcdFx0XHRuZXdMYWJlbCA9IHRhcmdldC50ZXh0Q29udGVudDtcclxuXHJcblx0XHRcdFx0Y2hhbmdlUmVhbFNlbGVjdEJveChuZXdWYWx1ZSwgbmV3TGFiZWwpXHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIFRpY2sgYW5kIGhpZ2hsaWdodCB0aGUgb3B0aW9uIHRoYXQncyBjdXJyZW50bHkgaW4gdXNlXHJcblx0XHRcdGlmICggc3R5bGVTZWxlY3RPcHRpb24uZGF0YXNldC52YWx1ZSA9PT0gcmVhbFNlbGVjdC52YWx1ZSApIHtcclxuXHRcdFx0XHRoaWdobGlnaHRlZE9wdGlvbkluZGV4ID0gaW5kZXg7XHJcblx0XHRcdFx0c3R5bGVTZWxlY3RPcHRpb24uY2xhc3NMaXN0LmFkZCgndGlja2VkJyk7XHJcblx0XHRcdFx0c3R5bGVTZWxlY3RPcHRpb24uY2xhc3NMaXN0LmFkZCgnaGlnaGxpZ2h0ZWQnKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJbXBvcnRhbnQ6IHdlIGNhbid0IHVzZSAnOmhvdmVyJyBhcyB0aGUga2V5Ym9hcmQgYW5kIGRlZmF1bHQgdmFsdWUgY2FuIGFsc28gc2V0IHRoZSBoaWdobGlnaHRcclxuXHRcdFx0c3R5bGVTZWxlY3RPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24oZXYpe1xyXG5cdFx0XHRcdHN0eWxlU2VsZWN0T3B0aW9uLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKHNpYmxpbmcsIGluZGV4KXtcclxuXHRcdFx0XHRcdGlmICggc2libGluZyA9PT0gZXYudGFyZ2V0ICkge1xyXG5cdFx0XHRcdFx0XHRzaWJsaW5nLmNsYXNzTGlzdC5hZGQoJ2hpZ2hsaWdodGVkJyk7XHJcblx0XHRcdFx0XHRcdGhpZ2hsaWdodGVkT3B0aW9uSW5kZXggPSBpbmRleDtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZSgnaGlnaGxpZ2h0ZWQnKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KTtcclxuXHJcblxyXG5cclxuXHRcdHZhciBjbG9zZUFsbFN0eWxlU2VsZWN0cyA9IGZ1bmN0aW9uKGV4Y2VwdGlvbil7XHJcblx0XHRcdHF1ZXJ5QWxsKCcuc3R5bGUtc2VsZWN0JykuZm9yRWFjaChmdW5jdGlvbihzdHlsZVNlbGVjdEVsKSB7XHJcblx0XHRcdFx0aWYgKCBzdHlsZVNlbGVjdEVsICE9PSBleGNlcHRpb24gKSB7XHJcblx0XHRcdFx0XHRzdHlsZVNlbGVjdEVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgdG9nZ2xlU3R5bGVkU2VsZWN0ID0gZnVuY3Rpb24oc3R5bGVkU2VsZWN0Qm94KXtcclxuXHRcdFx0aWYgKCAhIHN0eWxlZFNlbGVjdEJveC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSApIHtcclxuXHRcdFx0XHQvLyBJZiB3ZSdyZSBjbG9zZWQgYW5kIGFib3V0IHRvIG9wZW4sIGNsb3NlIG90aGVyIHN0eWxlIHNlbGVjdHMgb24gdGhlIHBhZ2VcclxuXHRcdFx0XHRjbG9zZUFsbFN0eWxlU2VsZWN0cyhzdHlsZWRTZWxlY3RCb3gpO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIFRoZW4gdG9nZ2xlIG9wZW4vY2xvc2VcclxuXHRcdFx0c3R5bGVkU2VsZWN0Qm94LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gV2hlbiBhIHN0eWxlZCBzZWxlY3QgYm94IGlzIGNsaWNrZWRcclxuXHRcdHZhciBzdHlsZWRTZWxlY3RlZE9wdGlvbiA9IHF1ZXJ5KCcuc3R5bGUtc2VsZWN0W2RhdGEtc3MtdXVpZD1cIicgKyB1dWlkICsgJ1wiXSAuc3Mtc2VsZWN0ZWQtb3B0aW9uJyk7XHJcblx0XHRzdHlsZWRTZWxlY3RlZE9wdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XHJcblx0XHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR0b2dnbGVTdHlsZWRTZWxlY3QoZXYudGFyZ2V0LnBhcmVudE5vZGUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gS2V5Ym9hcmQgaGFuZGxpbmdcclxuXHRcdHN0eWxlZFNlbGVjdGVkT3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihldikge1xyXG5cdFx0XHR2YXIgc3R5bGVkU2VsZWN0Qm94ID0gZXYudGFyZ2V0LnBhcmVudE5vZGU7XHJcblxyXG5cdFx0XHRzd2l0Y2ggKGV2LmtleUNvZGUpIHtcclxuXHRcdFx0XHRjYXNlIEtFWUNPREVTLlNQQUNFOlxyXG5cdFx0XHRcdFx0Ly8gU3BhY2Ugc2hvd3MgYW5kIGhpZGVzIHN0eWxlcyBzZWxlY3QgYm94ZXNcclxuXHRcdFx0XHRcdHRvZ2dsZVN0eWxlZFNlbGVjdChzdHlsZWRTZWxlY3RCb3gpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBLRVlDT0RFUy5ET1dOOlxyXG5cdFx0XHRcdGNhc2UgS0VZQ09ERVMuVVA6XHJcblx0XHRcdFx0XHQvLyBNb3ZlIHRoZSBoaWdobGlnaHQgdXAgYW5kIGRvd25cclxuXHRcdFx0XHRcdGlmICggISBzdHlsZWRTZWxlY3RCb3guY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykgKSB7XHJcblx0XHRcdFx0XHRcdC8vIElmIHN0eWxlIHNlbGVjdCBpcyBub3Qgb3BlbiwgdXAvZG93biBzaG91bGQgb3BlbiBpdC5cclxuXHRcdFx0XHRcdFx0dG9nZ2xlU3R5bGVkU2VsZWN0KHN0eWxlZFNlbGVjdEJveCk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQvLyBJZiBzdHlsZSBzZWxlY3QgaXMgYWxyZWFkeSBvcGVuLCB0aGVzZSBzaG91bGQgY2hhbmdlIHdoYXQgdGhlIGhpZ2hsaWdodGVkIG9wdGlvbiBpc1xyXG5cdFx0XHRcdFx0XHRpZiAoIGV2LmtleUNvZGUgPT09IEtFWUNPREVTLlVQICkge1xyXG5cdFx0XHRcdFx0XHRcdC8vIFVwIGFycm93IG1vdmVzIGVhcmxpZXIgaW4gbGlzdFxyXG5cdFx0XHRcdFx0XHRcdGlmICggaGlnaGxpZ2h0ZWRPcHRpb25JbmRleCAhPT0gMCApIHtcclxuXHRcdFx0XHRcdFx0XHRcdGhpZ2hsaWdodGVkT3B0aW9uSW5kZXggPSBoaWdobGlnaHRlZE9wdGlvbkluZGV4IC0gMVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBEb3duIGFycm93IG1vdmVzIGxhdGVyIGluIGxpc3RcclxuXHRcdFx0XHRcdFx0XHRpZiAoIGhpZ2hsaWdodGVkT3B0aW9uSW5kZXggPCBoaWdobGlnaHRlZE9wdGlvbkluZGV4TWF4ICkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aGlnaGxpZ2h0ZWRPcHRpb25JbmRleCA9IGhpZ2hsaWdodGVkT3B0aW9uSW5kZXggKyAxXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHN0eWxlU2VsZWN0T3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG9wdGlvbiwgaW5kZXgpe1xyXG5cdFx0XHRcdFx0XHRcdGlmICggaW5kZXggPT09IGhpZ2hsaWdodGVkT3B0aW9uSW5kZXggKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRvcHRpb24uY2xhc3NMaXN0LmFkZCgnaGlnaGxpZ2h0ZWQnKVxyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRvcHRpb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlnaGxpZ2h0ZWQnKVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldi5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdC8vIFVzZXIgaGFzIHBpY2tlZCBhbiBpdGVtIGZyb20gdGhlIGtleWJvYXJkXHJcblx0XHRcdFx0Y2FzZSBLRVlDT0RFUy5FTlRFUjpcclxuXHRcdFx0XHRcdHZhciBoaWdobGlnaHRlZE9wdGlvbiA9IHN0eWxlZFNlbGVjdGVkT3B0aW9uLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgnLnNzLW9wdGlvbicpW2hpZ2hsaWdodGVkT3B0aW9uSW5kZXhdLFxyXG5cdFx0XHRcdFx0XHRuZXdWYWx1ZSA9IGhpZ2hsaWdodGVkT3B0aW9uLmRhdGFzZXQudmFsdWUsXHJcblx0XHRcdFx0XHRcdG5ld0xhYmVsID0gaGlnaGxpZ2h0ZWRPcHRpb24udGV4dENvbnRlbnQ7XHJcblxyXG5cdFx0XHRcdFx0Y2hhbmdlUmVhbFNlbGVjdEJveChuZXdWYWx1ZSwgbmV3TGFiZWwpO1xyXG5cdFx0XHRcdFx0ZXYucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGV2LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIENsaWNraW5nIG91dHNpZGUgb2YgdGhlIHN0eWxlZCBzZWxlY3QgYm94IGNsb3NlcyBhbnkgb3BlbiBzdHlsZWQgc2VsZWN0IGJveGVzXHJcblx0XHRxdWVyeSgnYm9keScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xyXG5cclxuXHRcdFx0aWYgKCAhIGlzQW5jZXN0b3JPZihldi50YXJnZXQsICcuc3R5bGUtc2VsZWN0JywgdHJ1ZSkgKSB7XHJcblx0XHRcdFx0Y2xvc2VBbGxTdHlsZVNlbGVjdHMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblx0fTtcclxuXHJcbi8vIENsb3NlIFVNRCBtb2R1bGVcclxufSkpO1xyXG5cclxuIl19
