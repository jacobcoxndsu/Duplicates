var Animate = {

    displayGrayTransition: function (hide, callbackOne, callbackTwo) {
        var c = document.getElementById("gray");
        c.classList.add("anim");

        var call = callbackTwo;

        var hideGrayTransition = function (hide, callback) {
            var c = document.getElementById("gray");
            if (hide) {
                c.classList.remove("anim");
            }
            callback();
        }

        setTimeout(callbackOne, 1000);
        setTimeout(hideGrayTransition, 2000, hide, call);

    },

    displayRedTransition: function (hide, callbackOne, callbackTwo) {
        var c = document.getElementById("red");
        c.classList.add("anim");

        var call = callbackTwo;

        var c2 = document.getElementById("restart-screen");
        c2.style.visibility = "visible";

        setTimeout(function () {
            c2.classList.add("anim");
        }, 1000);

        var hideGrayTransition = function (hide, callback) {
            var c = document.getElementById("red");
            if (hide) {
                c.classList.remove("anim");
            }
            callback();
        }

        setTimeout(callbackOne, 1000);
        setTimeout(hideGrayTransition, 2000, hide, call);

    },


    displayGreenTransition: function (hide, callbackOne, callbackTwo) {
        var c = document.getElementById("green");
        c.classList.add("anim");

        var call = callbackTwo;

        var hideGrayTransition = function (hide, callback) {
            var c = document.getElementById("green");
            if (hide) {
                c.classList.remove("anim");
            }
            callback();
        }

        setTimeout(callbackOne, 1000);
        setTimeout(hideGrayTransition, 2000, hide, call);

    },
}





/*


    hideGrayTransition: function (callback) {
        console.log("called");
        var c = document.getElementById("gray");
        c.classList.remove("anim");
        callback();
    },

    hideGrayTransition: function (callback) {
        var c = document.getElementById("red");
        c.classList.remove("anim");
        callback();
    },

    hideGrayTransition: function (callback) {
        var c = document.getElementById("green");
        c.classList.remove("anim");
        callback();
    },

    displayAndHideGrayTransition: function (reverse) {
        var c = document.getElementById("gray");
        c.classList.add("anim");

        if (reverse) {
            setTimeout(function () {
                c.classList.remove("anim");
            }, 2000);
        }
    },

    displayAndHideRedTransition: function (reverse) {
        var c = document.getElementById("red");
        c.classList.add("anim");

        if (reverse) {
            setTimeout(function () {
                c.classList.remove("anim");
            }, 2000);
        }
    },

    displayAndHideGreenTransition: function (reverse) {
        var c = document.getElementById("green");
        c.classList.add("anim");

        if (reverse) {
            setTimeout(function () {
                c.classList.remove("anim");
            }, 2000);
        }
    },









    state: 0, //0 -- Not Animating, 1 -- Animating "Forward", 2 -- Animating "backwords"
    circleRadius: 0,
    animating: false,
    renderAnimation: false,
    px: 0,
    py: 0,
    color: 'rgb(32, 32, 32)',
    stepSize: 1,
    text: "",

    update: function (s) {
        if (this.state === 1) {
            this.circleRadius += this.stepSize;
            this.stepSize += 1;
        } else if (this.state === 2) {
            this.circleRadius -= this.stepSize;
        } else {
            this.stepSize = 0;
        }

        //Set position to that of the player
        this.px = G.p.px;
        this.py = G.p.py;

        //Clamp the Animations
        if (this.circleRadius < 0) {
            this.circleRadius = 0;
            //this.state = 0;
        }

        if (this.circleRadius > G.width + G.height && this.state === 1) {
            this.circleRadius = G.width + G.height;
        }
    },

    render: function (s, c) {
        if (this.state != 0) {
            c.fillStyle = this.color;
            c.beginPath();
            c.arc(this.px, this.py, this.circleRadius, 0, Math.PI * 2, false);
            c.fill();

            c.font = "50px Georgia";
            c.fillStyle = "white";
            c.textAlign = "center";
            c.fillText(this.text, G.width / 2, G.height / 2);
        }
    },

    circleCover: function (c, option) {
        this.color = c;
        this.state = 1;
        if (option) {
            setTimeout(function () {
                Animate.circleRemove();
            }, 1000);
        }
    },

    circleRemove: function () {
        this.state = 2;
        this.stepSize = this.stepSize / 2;
    },

    displayWords: function (text) {
        setTimeout(function () {
            Animate.changeText(text);
        }, 400);

        setTimeout(function () {
            Animate.changeText("");
        }, 1800);
    },

    changeText: function (t) {
        this.text = t;
    },
}




*/
