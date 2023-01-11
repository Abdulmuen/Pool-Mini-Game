class CueBall {
    constructor(game) {
        this.game = game;
        this.x = 500;
        this.y = 300;
        this.origion = {x:this.x + 20, y:this.y + 20};

        this.speed = 10;
        this.stopped = false;
        
    }

    update() {   
        if(this.game.isballhit){
            this.speed *= 0.985;
            this.x += this.speed;
        }
        if(this.speed <= 0.01)this.stopped = true;

    }

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/white ball.png"),this.x,this.y);
    }
}
