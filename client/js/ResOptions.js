var ResOptions = {
    playerImage: null,
    downImage: null,
    upImage: null,
    rightImage: null,
    leftImage: null,
    endImage: null,

    playerImageLocation: "res/Player.png",
    downImageLocation: "res/Down.png",
    upImageLocation: "res/Up.png",
    rightImageLocation: "res/Right.png",
    leftImageLocation: "res/Left.png",
    endImageLocation: "res/End.png",

    init: function () {
        this.playerImage = new Image();
        this.playerImage.loaded = false;
        this.playerImage.addEventListener('load', function () {
            ResOptions.playerImage.loaded = true;
        }, false);
        this.playerImage.src = this.playerImageLocation;

        this.downImage = new Image();
        this.downImage.loaded = false;
        this.downImage.addEventListener('load', function () {
            ResOptions.downImage.loaded = true;
        }, false);
        this.downImage.src = this.downImageLocation;

        this.upImage = new Image();
        this.upImage.loaded = false;
        this.upImage.addEventListener('load', function () {
            ResOptions.upImage.loaded = true;
        }, false);
        this.upImage.src = this.upImageLocation;

        this.rightImage = new Image();
        this.rightImage.loaded = false;
        this.rightImage.addEventListener('load', function () {
            ResOptions.rightImage.loaded = true;
        }, false);
        this.rightImage.src = this.rightImageLocation;

        this.leftImage = new Image();
        this.leftImage.loaded = false;
        this.leftImage.addEventListener('load', function () {
            ResOptions.leftImage.loaded = true;
        }, false);
        this.leftImage.src = this.leftImageLocation;

        this.endImage = new Image();
        this.endImage.loaded = false;
        this.endImage.addEventListener('load', function () {
            ResOptions.endImage.loaded = true;
        }, false);
        this.endImage.src = this.endImageLocation;
    },
}
