 const formHandling = () => {
     // Get the text inputting form els
     const formEls = document.querySelectorAll('.form__input, .form__textarea');

     if (!formEls.length) {
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
// Export so we can use as a module
export { formHandling, formRevealOnFill };
