var G = {
    canvas: document.getElementById('canvas'),
    context: this.canvas.getContext('2d'),
    width: this.canvas.width = window.innerWidth,
    height: this.canvas.height = window.innerHeight,
    scale: 1,

    p: null,
    tiles: null,
    tileIndex: 0,
    numTiles: 1,
    tilesWithoutDown: [2, 3, 1], //2
    tilesWithoutLeft: [2, 3, 0], //3
    tilesWithoutRight: [2, 1, 0], //1
    tilesWithoutUp: [3, 1, 0], //0
    currentTile: null,
    count: 0,
    creatingNewLevel: false,

    init: function () {
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;

        //Initialize the player Object
        this.p = new Player();
        this.p.image = ResOptions.playerImage;
        this.p.px = this.width / 2;
        this.p.py = this.height / 2;

        this.createAllNewTiles();

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

    },

    render: function (step) {
        //clear the canvas
        this.context.resetTransform();
        this.context.clearRect(0, 0, this.width, this.height);

        //render whatever background
        this.context.fillStyle = 'rgb(0, 87, 229)';
        //this.context.fillRect(0, 0, this.width, this.height);

        //update the change in player position
        var screenX = Math.floor(this.width / 2);
        var screenY = Math.floor(this.height / 2);
        var disX = (screenX - this.p.px);
        var disY = (screenY - this.p.py);
        this.context.translate(disX, disY);

        for (var i = 0; i < this.tiles.length; i++) {
            var t = this.tiles[i];
            if (t.display) {
                this.tiles[i].render(step, this.context);
            }
        }

        /*
        if (!this.creatingNewLevel) {
            if (this.p.remember) {
                for (var i = 0; i < this.tiles.length; i++) {
                    this.tiles[i].render(step, this.context);
                }
            } else {
                if (this.p.index > 0) {
                    this.tiles[this.p.index - 1].render(step, this.context);
                    this.tiles[this.p.index].render(step, this.context);
                    if (this.p.index < this.tiles.length - 1) {
                        this.tiles[this.p.index + 1].render(step, this.context);
                    }
                } else {
                    for (var i = 0; i < 2; i++) {
                        this.tiles[i].render(step, this.context);
                    }
                }
            }
        }
        */

        //Render the Player
        this.p.render(step, this.context);
    },

    onkeydown: function (event) {

    },

    onkeyup: function (event) {
        if (event.keyCode === 68 || event.keyCode === 39) //d
            this.p.updatePosition(1, 0);
        else if (event.keyCode === 83 || event.keyCode === 40) //s
            this.p.updatePosition(0, 1);
        else if (event.keyCode === 65 || event.keyCode === 37) //a
            this.p.updatePosition(-1, 0);
        else if (event.keyCode === 87 || event.keyCode === 38) // w
            this.p.updatePosition(0, -1);
    },

    resetForMemorizationTry: function () {

        for (var i = 0; i < this.tiles.length; i++) {
            this.tiles[i].remember = true;
        }
    },

    createNewLevel: function () {
        this.createAllNewTiles();
    },









    /*
     *  A function that will create one Tile given a type, x, and y value.
     *
     *  @return: A new Tile
     *
     *  type: The type of the previous tile(so this one will not be an opposite).
     *  x: The x position for this Tile (the newX Position of the previous Tile).
     *  y: The y position for this Tile (the newY Position of the previous Tile).
     */
    createTile: function (type, x, y) {
        var t = new Tile();
        t.setType(type);
        t.setPosX(x);
        t.setPosY(y);

        if (type === 0) {
            t.setImage(ResOptions.upImage);
            t.setNewX(x);
            t.setNewY(y - t.getHeight());
        } else if (type === 1) {
            t.setImage(ResOptions.rightImage);
            t.setNewX(x + t.getWidth());
            t.setNewY(y);
        } else if (type === 2) {
            t.setImage(ResOptions.downImage);
            t.setNewX(x);
            t.setNewY(y + t.getHeight());
        } else if (type === 3) {
            t.setImage(ResOptions.leftImage);
            t.setNewX(x - t.getWidth());
            t.setNewY(y);
        } else if (type === 4) {
            t.setImage(ResOptions.endImage);
            t.setNewX(0); //Doesn't really matter because it wont be used.
            t.setNewY(0); //Doesn't really matter because it wont be used.
            t.setEnd(true);
        }

        return t;
    },


    /*
     *  A function that will create all the tiles from 0 to G.numTiles
     */
    createAllNewTiles: function () {
        //Resetting the tiles array to empty
        this.tiles = [];
        this.tileIndex = 0;

        /* The first Tile */
        //Pick a random number for the arrow tiles(not including the End tile).
        var rand = getRandomInt(0, 3);
        //Set the "currentTile" object equal to the new tile created.
        this.currentTile = this.createTile(rand, this.width / 2, this.height / 2);
        this.currentTile.setFlag(true); //This tile is currently being walked on...
        //add the first tile to the tiles array
        this.tiles[0] = this.currentTile;
        //Increment the tilesIndex variable to reflect the addition.
        this.tileIndex++;

        /* The middle Tiles */
        //Create all the rest of the tiles in order
        for (var i = 1; i < this.numTiles; i++) {
            rand = getRandomInt(0, 2);
            var type = 0;
            //Choose from a list of tiles that does not contain the current tiles' opposite.
            if (this.currentTile.type === 0) {
                type = this.tilesWithoutUp[rand];
            } else if (this.currentTile.type === 1) {
                type = this.tilesWithoutRight[rand];
            } else if (this.currentTile.type === 2) {
                type = this.tilesWithoutDown[rand];
            } else if (this.currentTile.type === 3) {
                type = this.tilesWithoutLeft[rand];
            }

            var newTile = this.createTile(type, this.currentTile.getNewX(), this.currentTile.getNewY());
            this.tiles[this.tileIndex] = newTile;
            this.tileIndex++;
            this.currentTile = newTile;
        }

        /* The Last (End) Tile */
        var newTile = this.createTile(4, this.currentTile.getNewX(), this.currentTile.getNewY());
        this.tiles[this.tileIndex] = newTile;
        this.tileIndex++;
        this.currentTile = newTile;
    },

    /*
     *  A function that gets called every time the window changes size,
     *  it changes the canvas variables to reflect the change in canvas size.
     */
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
