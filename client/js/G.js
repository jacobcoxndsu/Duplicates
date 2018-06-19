var G = {
    canvas: document.getElementById('canvas'),
    context: this.canvas.getContext('2d'),
    width: this.canvas.width = window.innerWidth,
    height: this.canvas.height = window.innerHeight,
    scale: .75 * this.height / 100,

    p: null,
    tiles: null,
    tileIndex: 0,
    numTiles: 10,
    tilesWithoutDown: [0, 1, 3],
    tilesWithoutLeft: [0, 1, 2],
    tilesWithoutRight: [0, 2, 3],
    tilesWithoutUp: [1, 2, 3],
    currentTile: null,
    count: 0,

    init: function () {
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;

        //Initialize the player Object
        this.p = new Player();
        this.p.image = ResOptions.playerImage;

        this.tiles = [];
        var num = getRandomInt(0, 3);
        this.currentTile = getTile(num, this.width / 2, this.height / 2);
        this.currentTile.type = num;
        this.tiles[this.tileIndex] = this.currentTile;
        this.tileIndex++;

        this.setTiles();

        this.run();
    },

    run: function () {
        var G = this;
        var now;
        var dt = 0;
        var last = timestamp();
        var slow = 1; // slow motion scaling factor
        var step = 1 / 60;
        var slowStep = slow * step;

        var frame = function () {
            now = timestamp();
            dt = dt + Math.min(1, (now - last) / 1000);

            while (dt > slowStep) {
                dt = dt - slowStep;
                G.update(step);
            }

            G.render(dt / slow);
            last = now;
            requestAnimationFrame(frame);
        }

        frame();

    },

    update: function (step) {
        for (var i = 0; i < this.tiles.length; i++) {
            this.tiles[i].update(step);
        }
    },

    render: function (step) {
        //clear the canvas
        this.context.resetTransform();
        this.context.clearRect(0, 0, this.width, this.height);

        //render whatever background
        this.context.fillStyle = "purple";
        this.context.fillRect(0, 0, this.width, this.height);

        //update the change in player position
        var screenX = Math.floor(this.width / 2);
        var screenY = Math.floor(this.height / 2);
        var disX = (screenX - this.p.px);
        var disY = (screenY - this.p.py);
        this.context.translate(disX, disY);

        //render the objects
        for (var i = 0; i < this.tiles.length; i++) {
            this.tiles[i].render(step, this.context);
            if (this.count < this.tiles.length) {
                //console.log(this.tiles[i].cx + ", " + this.tiles.cy);
                this.count++;
            }
        }

        //Render the Player
        this.p.render(step, this.context);

        //Render animations
    },

    onkeydown: function (event) {

    },

    onkeyup: function (event) {
        if (event.keyCode === 68 || event.keyCode === 39) //d
            this.p.changePosition(1, 0);
        else if (event.keyCode === 83 || event.keyCode === 40) //s
            this.p.changePosition(0, 1);
        else if (event.keyCode === 65 || event.keyCode === 37) //a
            this.p.changePosition(-1, 0);
        else if (event.keyCode === 87 || event.keyCode === 38) // w
            this.p.changePosition(0, -1);
    },

    setTiles: function () {
        var rand = 0;
        var type = 0;

        for (var i = 1; i < this.numTiles; i++) {
            if (this.currentTile.type === 0) {
                rand = getRandomInt(0, 2);
                type = this.tilesWithoutDown[rand];
                var temp = new Tile(type, this.currentTile.pointX, this.currentTile.pointY);
                this.currentTile = temp;
            } else if (this.currentTile.type === 1) {
                rand = getRandomInt(0, 2);
                type = this.tilesWithoutRight[rand];
                var temp = new Tile(type, this.currentTile.pointX, this.currentTile.pointY);
                this.currentTile = temp;
            } else if (this.currentTile.type === 2) {
                rand = getRandomInt(0, 2);
                type = this.tilesWithoutUp[rand];
                var temp = new Tile(type, this.currentTile.pointX, this.currentTile.pointY);
                this.currentTile = temp;
            } else if (this.currentTile.type === 3) {
                rand = getRandomInt(0, 2);
                type = this.tilesWithoutLeft[rand];
                var temp = new Tile(type, this.currentTile.pointX, this.currentTile.pointY);
                this.currentTile = temp;
            }

            this.tiles[this.tileIndex] = this.currentTile;
            this.tileIndex++;
        }
    },

    resize: function () {
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
    },
}
