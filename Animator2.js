class Animator2 {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration});
        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;

    }

    drawFrame(tick, ctx, x, y, angle) {

        

        this.elapsedTime += tick;
        if(this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        const frame = this.currentFrame

        ctx.save();
        ctx.translate(x+this.width,y);
        //this.angle = Math.PI*(0/2);
        ctx.rotate(angle);

        ctx.drawImage(this.spritesheet,
            this.xStart + 10, this.yStart,
            this.width, this.height,
            Math.cos(angle),Math.sin(angle),
           -this.width, -this.height
            )
        ctx.restore();
        

    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    }
}