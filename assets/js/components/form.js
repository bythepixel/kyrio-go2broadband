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
     const formEls = document.querySelectorAll('.interaction--form-reveal-on-fill');

     if (!formEls.length) {
         return;
     }

     for (let i = 0; i < formEls.length; i++) {
         let el = formEls[i];

         if (!el.hasAttribute('data-target')) {
             throw Error('No data-target for interaction form reveal element');
         }

         let check, eType;
         switch (el.getAttribute('type')) {
             case 'checkbox':
             case 'radio':
                 check = 'checked';
                 eType = 'change';
                 break;
             default:
                 check = 'value';
                 eType = 'input';
         }

         let reveal = document.querySelector(el.getAttribute('data-target'));

         reveal.classList.add('form__hide');

         el.addEventListener(eType, (event) => {
             const target = event.target;

             if (target[check]) {
                 console.log('on');
                 // And if classList doesn't contain active class
                 if (!reveal.classList.contains('form__reveal')) {
                     // Add active class
                     reveal.classList.add('form__reveal');
                 }
             // Else if reveal doesn't have a value
             } else {
                 console.log('off');
                 if (reveal.classList.contains('form__reveal')) {
                     reveal.classList.remove('form__reveal');
                 }
             }
         });
     }
 }
// Export so we can use as a module
export { formHandling, formRevealOnFill };
