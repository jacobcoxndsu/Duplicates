window.onload = function () {
    ResOptions.init();
    G.init();

    setTimeout(function () {
        document.body.classList.add("loaded");
    }, 600);
}

//function gets called when the canvas is resized
window.addEventListener('resize', function () {
    G.resize();
}, false);

// add listener to disable scroll
window.addEventListener('scroll', noscroll);

// Remove listener to disable scroll
window.removeEventListener('scroll', noscroll);

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function noscroll() {
    window.scrollTo(0, 0);
}

function reloadPage() {
    location.reload();
}


document.onkeydown = function (event) {
    G.onkeydown(event);
}

document.onkeyup = function (event) {
    G.onkeyup(event);
}
