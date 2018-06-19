function Tile(cx, cy) {
    this.width = 128;
    this.height = 128;
    this.cx = cx;
    this.cy = cy;
    this.px = cx - (this.width / 2);
    this.py = cy - (this.height / 2);
    this.pointX = 0;
    this.pointY = 0;
    this.color = "black";
    this.image = null;
    this.type = 0;

    this.update = function (s) {

    }

    this.render = function (s, c) {
        if (this.image) {
            if (this.image.loaded) {
                c.drawImage(this.image, this.px, this.py);
            }
        }
    }
}

function getTile(type, x, y) {
    console.log(type);
    var t = new Tile(x, y);
    if (type == 0) {
        t.image = ResOptions.upImage;
        t.pointX = x;
        t.pointY = y - t.height;
        t.type = type;
    } else if (type == 1) {
        t.image = ResOptions.rightImage;
        t.pointX = x + t.width;
        t.pointY = y;
        t.type = type;
    } else if (type == 2) {
        t.image = ResOptions.downImage;
        t.pointX = x + t.height;
        t.pointY = y;
        t.type = type;
    } else if (type == 3) {
        t.image = ResOptions.leftImage;
        t.pointX = x;
        t.pointY = y - t.width;
        t.type = type;
    } else {
        console.log("Tile type not valid.");
    }

    return t;
}
