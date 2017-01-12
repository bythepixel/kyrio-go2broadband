/**
 * Listen for input events on form elements to
 * handle the label placeholder change
 * @return void
 */
 const formHandling = () => {
     // Get the text inputting form els
     const formEls = document.querySelectorAll('.form__input, .form__textarea');
     // If no form els
     if (!formEls.length) {
         // Exit
         return;
     }

     // Loop the form els
     for (let i = 0; i < formEls.length; i++) {
         // Cache the current element
         let el = formEls[i];
         // Track 'input' events on element
         el.addEventListener('input', (event) => {
             // Cache the event.target
             const target = event.target;
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

    // Wait for the window to load before firing events
     window.addEventListener('load', () => {
         // Create a new CustomEvent
         let ev = new CustomEvent('input');
         // Loop elements
         for (let i = 0; i < formEls.length; i++) {
              // Dispatch the event
              formEls[i].dispatchEvent(ev);
         }
     });
 }

/**
 * Reveal element when form element is filled/checked
 *
 * Ex:
 * <input type="checkbox" class="interaction--form-reveal-on-fill" data-target=".target" name="moving-to" id="moving-to">
 * <div class="target"></div>
 *
 * @return void
 */
 const formRevealOnFill = () => {
    //  Get the reveal elements
     const formEls = document.querySelectorAll('.interaction--form-reveal-on-fill');
     // If we don't have any items
     if (!formEls) {
         // Exit
         return;
     }

     // Loop through the els
     for (let i = 0; i < formEls.length; i++) {
         // Cache the current el
         let el = formEls[i];

         // If the el doesn't have a 'data-target' attr
         if (!el.hasAttribute('data-target')) {
             // Throw an exception
             throw Error('No data-target for interaction form reveal element');
         }

         // Init some vars
         let check, eType;
         // Switch form element types
         switch (el.getAttribute('type')) {
             // if checkbox or radio
             case 'checkbox':
             case 'radio':
                 // Check checked value
                 check = 'checked';
                 // Listen for change event
                 eType = 'change';
                 break;
             // All else
             default:
                 // Check value
                 check = 'value';
                 // Listen for input event
                 eType = 'input';
         }
         // Get the revealed element
         let reveal = document.querySelector(el.getAttribute('data-target'));
         // Add the form hide class to it
         reveal.classList.add('form__hide');
         // Add the listener
         el.addEventListener(eType, (event) => {
             // Get the element controlling the interaction
             const target = event.target;
             // If the value passes the check
             if (target[check]) {
                 // And if classList doesn't contain reveal class
                 if (!reveal.classList.contains('form__reveal')) {
                     // Add reveal class
                     reveal.classList.add('form__reveal');
                 }
             // Else if reveal doesn't have a value
             } else {
                //  If classList contains reveal class
                 if (reveal.classList.contains('form__reveal')) {
                     // Remove reveal class
                     reveal.classList.remove('form__reveal');
                 }
             }
         });
     }
 }

/**
 * Listen for submit events on forms and change the checkbox values
 * to true/false values
 * @return {void}
 */
const formCheckboxValReplace = () => {
    // Get all forms on the page
    const forms = document.querySelectorAll('form');

    // If there are no forms for the current page
    if (!forms.length) {
        // Exit
        return;
    }

    // Loop the forms
    for (let i = 0; i < forms.length; i++) {
        // Cache the current form
        let form = forms[i];
        // Get the form's checkboxes
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        // If no checkboxes
        if (!checkboxes.length) {
            // Exit
            return;
        }

        // Add submit listener to form
        /*form.addEventListener('submit', (event) => {
            // Prevent the form from submitting
            event.preventDefault();
            // Map the checkboxes to true/false values and re-submit
            mapCheckboxBoolValues(event.target, checkboxes);
        });*/
    }
};

/**
 * Map checkboxes values to bool values
 * @param  {HTMLElement}        form
 * @param  {Array<HTMLElement>} checkboxes
 * @return {void}
 */
const mapCheckboxBoolValues = (form, checkboxes) => {
    // Loop the checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        // Cache the current checkbox
        let checkbox = checkboxes[i];

        // If the checkbox is checked
        if (checkbox.checked) {
            // Change the value to true
            checkbox.value = true;
        // If the checkbox is not checked
        } else {
            // **
            // We have to set the checked value to true here. Browser default
            // behavior is to ignore unchecked checkboxes. In order to submit an
            // unchecked checkbox with a value of false, we have to set it to
            // checked and attach the value to it.
            // *
            checkbox.checked = true;
            checkbox.value = false;
        }
    }
    // Submit the form normally
    form.submit();
};
// Export so we can use as a module
export { formHandling, formRevealOnFill, formCheckboxValReplace };
