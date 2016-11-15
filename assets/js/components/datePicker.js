import pikaday from 'pikaday';

const datePicker = _in => {
    // Hook up pikaday
    const dates = document.querySelectorAll(_in);
    // Create a new input CustomEvent
    let ev = new CustomEvent('input');
    // Loop elements
    for (let i = 0; i < dates.length; i++) {
        // Cache the current element
        let date = dates[i];
        // Start a new pikaday
        new pikaday({
            field: date,
            onSelect: function() {
                date.dispatchEvent(ev);
            }
        });
    }
}

export { datePicker };
