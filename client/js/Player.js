function Player() {

    //Non resetting variables
    this.width = 128; //Width of the Player.
    this.height = 129; //Height of the Player.
    this.image = null; //Image to be displayed
    this.stepSize = 128; //How far, in pixels the player moves per step

    //resetting variables
    this.px = G.width / 2; // Center X position (should be reset every time the game is re-done).
    this.py = G.height / 2; //Center Y position (should be reset every time the game is re-done).
    this.rememberStage = false; //Keeps track of when they are viewing or trying out their memory.
    this.score = 0; //The players score, to be reset everytime the user looses.
    this.canMove = true; //Should the player be able to move or not? (used during transitions and such).
    this.index = 0; //The index of the player in the Tiles array (the player should go in order to win).

    /*
     *  The render function for the Player.
     *
     *  s: the missed step.
     *  c: the context to render with.
     */
    this.render = function (s, c) {
        if (this.image) {
            if (this.image.loaded) {
                var x = this.px - (this.width / 2);
                var y = this.py - (this.height / 2);
                c.drawImage(this.image, 0, 0, this.width, this.height, x, y, this.width * G.scale, this.height * G.scale);
            }
        }
    }

    /*
     *  The update function for the Player (currently not used).
     *
     *  s: the missed step.
     */
    this.update = function (s) {}


    /*
     *  A function that updates the players' position as well as checks if the 
     *  user made the correct move.
     *   
     *  x: the vertical movement (1 or -1 or 0).
     *  y: the horizontal movement (1 or -1 or 0).
     */
    this.updatePosition = function (x, y) {

        if (this.canMove) {
            //Move the player and update the index
            this.px += x * this.stepSize;
            this.py += y * this.stepSize;
            this.index++;

            //Check is the movement was valid or not
            if (this.index < G.tiles.length) {
                var tile = G.tiles[this.index];
                //Does this move match up with the next tile in the list?
                if (tile.checkPosition(this.px, this.py)) {
                    tile.setFlag(true);

                    //If the player has walked over it correctly, display it.
                    G.tiles[this.index - 1].setDisplay(true);

                    if (tile.getEnd()) {
                        tile.setDisplay(true);
                        if (this.checkCorrect()) {
                            if (this.rememberStage) {
                                this.correct();
                            } else {
                                this.toRememberState();
                            }
                        } else {
                            this.incorrect();
                        }
                    }
                } else {
                    this.incorrect();
                }
            } else {
                this.incorrect();
            }
        }
    }

    /*
     *  checks if all the tiles have been flagged true.
     *
     *  @returns: true is it is correct and false if it is not.
     */
    this.checkCorrect = function () {
        for (var i = 0; i < G.tiles.length; i++) {
            if (G.tiles[i].getFlag() === false) {
                return false;
            }
        }

        return true;
    }

    /*
     * To be called whenever the player has incorectly completed the level.
     */
    this.incorrect = function () {
        this.canMove = false;
        Animate.displayRedTransition(false, incorrectCallbackOne, incorrectCallbackTwo);
    }

    var incorrectCallbackOne = function () {
        document.getElementById("finalScoreDisplay").innerHTML = "Final Score: \n" + G.p.score;
    }

    var incorrectCallbackTwo = function () {
        this.canMove = true;
    }

    /*
     * To be called whenever the player has cirrectly completed a level.
     */
    this.correct = function () {
        this.canMove = false;
        Animate.displayGreenTransition(true, correctCallbackOne, correctCallbackTwo);
        this.score++;
    }

    var correctCallbackOne = function () {
        var p = G.p;

        //reset the players parameters
        p.rememberStage = false;
        p.index = 0;
        p.px = G.width / 2;
        p.py = G.height / 2;

        document.getElementById("scoreDisplay").innerHTML = "Score: " + p.score;

        G.numTiles++;
        G.createNewLevel();
    }

    var correctCallbackTwo = function () {
        G.p.canMove = true;
    }

    /*
     * To be called whenever the player completes the first have of a level.
     */
    this.toRememberState = function () {
        this.canMove = false;
        Animate.displayGrayTransition(true, toRememberStateCallbackOne, toRememberStateCallbackTwo);

    }

    var toRememberStateCallbackOne = function () {
        var p = G.p;

        //reset the players parameters
        p.rememberStage = true;
        p.index = 0;
        p.px = G.width / 2;
        p.py = G.height / 2;

        //reset the flags on the tiles
        for (var i = 1; i < G.tiles.length; i++) {
            G.tiles[i].setFlag(false);
        }

        for (var i = 0; i < G.tiles.length; i++) {
            G.tiles[i].setDisplay(false);
        }
    }

    var toRememberStateCallbackTwo = function () {
        G.p.canMove = true;
    }

    /*
     * To be called when you want the page to be reloaded. (not used currently)
     */
    this.reload = function () {
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
}
