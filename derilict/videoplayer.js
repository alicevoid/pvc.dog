/* ALICE VOID 9/16/25 */

// Video Controls
const video = document.getElementById('the_channel');
console.log(video);

video.addEventListener('click', function () {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});

// Hide the Tab 
const button = document.getElementById('thinkDiff');
const tv = document.getElementById('wholeTV');

console.log(button);
console.log(tv);

button.addEventListener('click', function () {

    if (tv.style.display === 'none') {
        tv.style.display = 'block';

    } else {
        tv.style.display = 'none';
    }
});
