window.onload = function () {
    ResOptions.init();
    G.init();
}

//function gets called when the canvas is resized
window.addEventListener('resize', G.resize(), false);

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.onkeydown = function (event) {
    G.onkeydown(event);
}

document.onkeyup = function (event) {
    G.onkeyup(event);
}
