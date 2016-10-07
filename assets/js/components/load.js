/**
 * Fade in on load
 * @param  {string} load    Class targeting elements to load
 * @param  {string} loading Class to apply when elements are loading
 * @param  {string} loaded  Class to apply when elements have loaded
 * @return {void}
 */
const fadeIn = (load, loading, loaded) => {
    // Get the targeted elements
    const targets = document.querySelectorAll(`.${load}`);
    // If we have targets
    if (targets.length) {
        // Loop through targets
        targets.forEach(target => {
            // Set the opacity of each element to 0
            target.style.opacity = 0;
        });
        // Watch for window load
        window.addEventListener('load', () => {
            // Item index
            let i = 0;
            // Loop through targets
            targets.forEach(target => {
                // Set timeout based upon index
                setTimeout(() => {
                    // Add the loading class
                    target.classList.add(loading);
                    // Remove style attribute from element
                    target.removeAttribute('style');
                    // Add the loaded class
                    target.classList.add(loaded);
                    // After half a second, remove all classes
                    setTimeout(() => {
                        target.classList.remove(load,loading,loaded);
                    }, 500);
                }, i * 200);
                // Increate the index
                i++;
            });
        });
    }
}

/**
 * Handle window resizes
 * @param  {number} bp
 * @return {void}
 */
const onWindowResize = bp => {
    // Get the video
    const video = document.querySelectorAll('video')[0];
    // Set paused to false
    let paused = false;
    // Listen for window resize
    window.addEventListener('resize', () => {
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
    window.dispatchEvent(new Event('resize', {bubbles: false, cancelable: false}));
}

/**
 * Check if element is in viewport
 * @param  {Element} element 
 * @param  {float}   start
 * @param  {float}   stop
 * @return {boolean}
 */
const inViewport = (element, start, stop) => {
    // Get element dimensions
    const rect = element.getBoundingClientRect();
    // Get the document
    const html = document.documentElement;
    // Return boolean
    return (
        // If element is inside top sweet spot
        rect.top >= (window.innerHeight * start || html.clientHeight * start) &&
        // And if element is inside bottom sweet spot
        rect.bottom <= (window.innerHeight * stop || html.clientHeight * stop)
    );
}

/**
 * Apply class on scroll
 * @param  {string} active
 * @return {void}
 */
const applyClassOnScroll = active => {
    // Get grid element
    const grid = document.getElementById('grid');
    // Get grid element direct children
    const gridItems = grid.children;
    // Get number of grid children
    const len = gridItems.length;
    // Listen for window scroll event
    window.addEventListener('scroll', () => {
        // Loop through items
        for (let i = 0; i < len; i++) {
            // Cache the grid child
            const item = gridItems[i];
            // If is in viewport and doesn't have active class
            if (inViewport(item, 0.3, 0.7) && !item.classList.contains(active)) {
                // Add active class
                item.classList.add(active);
            // Else if has active class
            } else if (item.classList.contains(active)) {
                // Remove active class
                item.classList.remove(active);
            }
        }
    });
}

/**
 * Parent func to run all page init scripts
 * @return {void}
 */
const pageInit = () => {
    fadeIn('interaction--load', 'interaction--loading', 'interaction--loaded');
    onWindowResize(800)
    applyClassOnScroll('interaction--scale');
}
// Export so we can use as a module
export { pageInit };
