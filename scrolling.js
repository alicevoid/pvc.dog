/* ALICE VOID - 9/16/25 */

// Global variables so everything can see 'em
let marqueeDiv;
let animationId = null;
let isScrolling = true;
let scrollSpeed = 1;
let currentPosition = 0;

// Main initialization
function initInfiniteScroll() {

    // grabbing marquee
    marqueeDiv = document.querySelector('.scrollMarquee');
    const originalContent = marqueeDiv.innerHTML;

    // length of marquee
    const originalWidth = Math.floor(marqueeDiv.scrollWidth);

    // adding it back onto itself
    marqueeDiv.innerHTML = originalContent + originalContent;

    // Start from the right side of the screen
    currentPosition = window.innerWidth;
    
    // start the scroll
    startScrollAnimation(originalWidth);
}

// The actual scrolling animation
function startScrollAnimation(resetPoint) {
    function animationLoop() {
        if (isScrolling) {
            // Move everything left by small increment each frame
            currentPosition -= scrollSpeed;
            // Apply the position
            marqueeDiv.style.transform = `translateX(${currentPosition}px)`;
            // Check for the reset point
            if (currentPosition <= -resetPoint) {
                currentPosition = 0;
            }
        }
        // Store the animation ID and keep the loop going
        animationId = requestAnimationFrame(animationLoop);
    }
    animationLoop();
}

// Control functions
function pauseScroll() {
    isScrolling = false;
}

function resumeScroll() {
    isScrolling = true;
}

function stopScroll() {
    cancelAnimationFrame(animationId);
    animationId = null;
}

function changeSpeed(newSpeed) {
    scrollSpeed = newSpeed;
}

// Fire it all up when page loads
window.addEventListener('DOMContentLoaded', initInfiniteScroll);