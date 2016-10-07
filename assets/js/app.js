import styleSelect from 'styleSelect';

styleSelect('.form__select');

// Lambda func to handle form funcs
(() => {
    // Get the text inputting form els
    const formEls = document.querySelectorAll('.form__input, .form__textarea');
    
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
    
})();
