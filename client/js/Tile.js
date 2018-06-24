function Tile() {

    //Non resetting variables
    this.type = 0; //Type of Tile it is.
    /*
     *   0 - Stands for "Up" Tile
     *   1 - Stands for "Right" Tile
     *   2 - Stands for "Down" Tile
     *   3 - Stands for "Left" Tile
     *   4 - Stands for "End" Tile
     */
    this.width = 128; //Width of the Tile.
    this.height = 128; //Height of the Tile.
    this.px = 0; //Center X position.
    this.py = 0; //Center Y position.
    this.image = null; //Image to be displayed
    this.newX = 0; //Point X used when creating a Tile after this one.
    this.newY = 0; //Point Y used when creating a Tile after this one.
    this.end = false; //boolean for if this tile is the end tile or not.
    this.number = 0; //Symbol number for memorization technique. (not implemented yet)
    this.letter = 'A'; //Symbol letter for memorization technique. (not implemented yet)

    //resetting variables
    this.flagged = false; //If the tile has been walked on during this iteration.
    this.display = true; //If the tile should be rendered (used for the memorization test).
    this.displayNumbers = false; //Option for displaying numbers. (not implemented yet)
    this.displayLetters = false; //OPtion for displaying Letters. (not implemented yet)

    /*
     *  The render function for this Tile.
     *
     *  s: the missed step.
     *  c: the context to render with.
     */
    this.render = function (s, c) {
        if (this.image) {
            if (this.image.loaded) {
                if (this.display) {
                    var x = this.px - (this.width / 2);
                    var y = this.py - (this.height / 2);
                    c.drawImage(this.image, 0, 0, this.width, this.height, x, y, this.width * G.scale, this.height * G.scale);
                }
            }
        }
    }

    /*
     *  The update function for this Tile (currently not used).
     *
     *  s: the missed step.
     */
    this.update = function (s) {}

    /* 
     *   Getters 
     */
    this.getType = function () {
        return this.type;
    }

    this.getWidth = function () {
        return this.width;
    }

    this.getHeight = function () {
        return this.height;
    }

    this.getPosX = function () {
        return this.px;
    }

    this.getPosY = function () {
        return this.py;
    }

    this.getNewX = function () {
        return this.newX;
    }

    this.getNewY = function () {
        return this.newY;
    }

    this.getFlag = function () {
        return this.flagged;
    }

    this.getDisplay = function () {
        return this.display;
    }

    this.getEnd = function () {
        return this.end;
    }

    this.getDisplayingNumbers = function () {
        return this.displayNumbers;
    }

    this.getDisplayingLetters = function () {
        return this.getDisplayingLetters;
    }

    this.getNumber = function () {
        return this.number;
    }

    this.getLetter = function () {
        return this.letter;
    }

    /* 
     *   Setters 
     */
    this.setType = function (t) {
        this.type = t;
    }

    this.setPosX = function (x) {
        this.px = x;
    }

    this.setPosY = function (y) {
        this.py = y;
    }

    this.setNewX = function (x) {
        this.newX = x;
    }

    this.setNewY = function (y) {
        this.newY = y;
    }

    this.setFlag = function (f) {
        this.flagged = f;
    }

    this.setDisplay = function (d) {
        this.display = d
    }

    this.setImage = function (i) {
        this.image = i;
    }

    this.setEnd = function (e) {
        this.end = e;
    }

    this.setDisplayingNumbers = function (d) {
        this.displayNumbers = d;
    }

    this.setDisplayingLetters = function (d) {
        this.displayLetters = d
    }

    this.setNumber = function (n) {
        this.number = n;
    }

    this.setLetter = function (l) {
        this.letter = l;
    }

    /*
     *  A function that will compare the x and y position given with 
     *  the position of this tile. Will return true if they are the same
     *  (remember this is a comparison with the center of the tile).
     *
     *  @return: boolean, true of they match, false if they don't.
     *   
     *  x: The x position in question.
     *  y: The y position in question.
     */
    this.checkPosition = function (x, y) {

        if (x) {
            if (y) {
                if (this.px === x && this.py === y) {
                    return true;
                }
            } else {
                console.log("Y position not found.");
            }
        } else {
            console.log("X position not found.");
        }

        return false;
    }
}
