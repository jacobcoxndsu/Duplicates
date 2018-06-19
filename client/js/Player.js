function Player() {
    this.index = 0;
    this.score = 0;
    this.px = G.width / 2;
    this.py = G.height / 2;
    this.stepSize = 128;
    this.image = null;

    this.update = function (s) {

    }

    this.render = function (s, c) {

        if (this.image) {
            if (this.image.loaded) {
                c.drawImage(this.image, this.px - this.image.width / 2, this.py - this.image.height / 2);
            }
        } else {
            c.fillStyle = "blue";
            c.beginPath();
            c.arc(this.px, this.py, 64, 0, Math.PI * 2, false);
            c.fill();
        }
    }

    this.changePosition = function (x, y) {
        this.px += x * this.stepSize;
        this.py += y * this.stepSize;
    }
}
