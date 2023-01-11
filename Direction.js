class direction {
    constructor(firstX, firstY, secondX, secondY){
        this.firstX = firstX;
        this.firstY = firstY;
        this.secondX = secondX;
        this.secondY = secondY;

        this.angle = 0;
    }

    rotation(){
        this.opposite = this.secondX - this.firstX;
        this.adjecent = this.secondy - this.firstY;

        this.angle = Math.atan2(this.opposite, this.adjecent);
    }
}