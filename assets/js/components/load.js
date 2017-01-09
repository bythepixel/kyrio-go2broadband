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
    // Get the loader
    const loader = document.querySelector('.media__loader--holder');
    // Get the last index
    const last = targets.length - 1;
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
                    target.style.opacity = 1;
                    // Add the loaded class
                    target.classList.add(loaded);
                    // After half a second, remove all classes
                    setTimeout(() => {
                        target.classList.remove(load,loading,loaded);
                    }, 500);
                    // If we're on the last item
                    if (i === last && loader) {
                        // Hide the loader
                        loader.style.opacity = 0;
                        setTimeout(() => loader.parentNode.removeChild(loader), 400);
                    }
                    i++;
                }, i * 200);
                // Increate the index
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
    // If we have a video
    if (video) {
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
        //  Create a new CustomEvent
         let ev = new CustomEvent('resize');
         // Dispatch the event
         window.dispatchEvent(ev);
    }
}

/**
 * Check if element is in viewport
 * @param  {Element} element
 * @param  {float}   start
 * @param  {float}   stop
 * @return {boolean}
 */
const inViewport = (element, start) => {
    // Get element dimensions
    const rect = element.getBoundingClientRect();
    // Get the document
    const html = document.documentElement;
    // Return boolean
    return (
        // If element is inside top sweet spot
        rect.top <= (window.innerHeight * start || html.clientHeight * start)
    );
}

/**
 * Apply class on scroll
 * @param  {string} active
 * @return {void}
 */
const applyClassOnScroll = (item, active) => {
    const scrollEvent = () => {
        // If is in viewport and doesn't have active class
        if (inViewport(item, 0.7)) {
            // Add active class
            item.classList.add(active);
            unbindScroll();
            return;
        }
    }

    const unbindScroll = () => {
        window.removeEventListener('scroll', scrollEvent);
    }

    // Dispatch event on page load
    setTimeout(() => {
        // Listen for window scroll event
        window.addEventListener('scroll', scrollEvent);
        //  Create a new CustomEvent
         let ev = new CustomEvent('scroll');
         // Dispatch the event
         window.dispatchEvent(ev);
    }, 500);
}

/**
 * Parent func to run all page init scripts
 * @return {void}
 */
const pageInit = () => {
    fadeIn('interaction--load', 'interaction--loading', 'interaction--loaded');
    onWindowResize(800)
    const grid = document.getElementById('grid');
    if (grid) {
        applyClassOnScroll(grid, 'interaction--attention');
    }
}
// Export so we can use as a module
export { pageInit };
