/*
function WheelSpin() {
    const element = document.getElementById("LootWheel");
    let angle = 0;
    const rotationDuration = 5000; // Set the rotation duration in milliseconds
    const interval = 10; // Set the interval for smoothness (smaller values will make it smoother)

    const startTime = Date.now();

    const rotateInterval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;

        if (elapsedTime >= rotationDuration) {
            clearInterval(rotateInterval);
        } else {
            const decayFactor = 0.01; // Adjust the decay factor for the rate of decay
            const decayedSpeed = 1 - Math.exp(-decayFactor * elapsedTime / rotationDuration);
            angle -= decayedSpeed; // Adjust the rotation speed using the decayedSpeed
            element.style.transform = `rotate(${angle}deg)`;
        }
    }, interval);
}

function toggleVisibility( nowVisibleName, newTitle) {
    const nowHidden = document.getElementById(nowHiddenName);
    const nowVisible = document.getElementById(nowVisibleName);
    const titleElement = document.querySelector("title");
    const oldTitle = titleElement.te

    if (nowHidden.style.display === "none") {
        nowHidden.style.display = "block";
        nowVisible.style.display = "none";
        if (titleElement.textContent === newTitle) {
            titleElement.textContent = oldTitle;
        }
    } else {
        nowHidden.style.display = "none";
        nowVisible.style.display = "block";
        if (titleElement.textContent === oldTitle) {
            titleElement.textContent = newTitle;
        }
    }
}
*/

function toggleVisibility(nowVisibleName, newTitle) {
    const nowVisible = document.getElementById(nowVisibleName);
    const titleElement = document.querySelector("title");

    // If "nowVisibleName" is already visible and title is already set to "newTitle", do nothing
    if (nowVisible.style.display === "block" && titleElement.textContent === newTitle) {
        return;
    }

    // Loop through all elements to find the currently visible element
    let nowHidden;
    const allElements = document.getElementsByTagName("*");
    for (let i = 0; i < allElements.length; i++) {
        const element = allElements[i];
        if (element.style.display === "block") {
            nowHidden = element;
            break;
        }
    }

    if (nowHidden && nowHidden !== nowVisible) {
        nowHidden.style.display = "none";
        nowVisible.style.display = "block";
        titleElement.textContent = newTitle;
    }
}

//runs the Links page
function setupToggleLinksListener() {
    const showLinksElement = document.getElementById("showLinks");

    // Adding a click event listener to the "showLinks" element
    showLinksElement.addEventListener("click", function () {
        event.preventDefault(); // Prevent the default link behavior (preventing page reload)
        toggleVisibility("links_pg", "Links | 0125.dog");
    });
}

//runs the Home page
function setupToggleIndexListener() {
    const showLinksElement = document.getElementById("showIndex");

    // Adding a click event listener to the "showLinks" element
    showLinksElement.addEventListener("click", function () {
        event.preventDefault(); // Prevent the default link behavior (preventing page reload)
        toggleVisibility("index_pg", "Home | 0125.dog");
    });
}

//runs the Lootcrate page
function setupToggleLootListener() {
    const showLinksElement = document.getElementById("showLoot");

    // Adding a click event listener to the "showLinks" element
    showLinksElement.addEventListener("click", function () {
        event.preventDefault(); // Prevent the default link behavior (preventing page reload)
        toggleVisibility("loot_pg", "Lootcrates | 0125.dog");
    });
}

// Adding an event listener to ensure the DOM content is loaded before setting up the click listener
document.addEventListener("DOMContentLoaded", function () {
    setupToggleLinksListener();
    setupToggleIndexListener();
    setupToggleLootListener();
});

// JavaScript code
const swagContainer = document.getElementById("swagContainer");
let isDragging = false;
let offsetX, offsetY;

swagContainer.addEventListener("mousedown", (event) => {
    isDragging = true;
    offsetX = event.clientX - swagContainer.offsetLeft;
    offsetY = event.clientY - swagContainer.offsetTop;
    swagContainer.style.cursor = "grabbing"; /* Change the cursor when dragging */
});

document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    const showcase = document.querySelector(".caseShowcase");
    const showcaseRect = showcase.getBoundingClientRect();
    const containerWidth = swagContainer.offsetWidth;
    const containerHeight = swagContainer.offsetHeight;

    let newX = event.clientX - offsetX - showcaseRect.left;
    let newY = event.clientY - offsetY - showcaseRect.top;

    // Keep the container within the boundaries of the caseShowcase container
    newX = Math.max(0, Math.min(newX, showcaseRect.width - containerWidth));
    newY = Math.max(0, Math.min(newY, showcaseRect.height - containerHeight));

    swagContainer.style.left = `${newX}px`;
    swagContainer.style.top = `${newY}px`;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    swagContainer.style.cursor = "grab";
});
