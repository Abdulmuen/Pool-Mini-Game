class Stick {
    constructor(game, ball) {
        this.game = game;
        this.ball = ball;
        this.center = {x: ball.x - 800, y: ball.y + 20};
        this.angle = 0;
        this.animator = new Animator2(ASSET_MANAGER.getAsset("./Sprites/stick.png"), 0, 0,820,26,1,1);
        this.temp = new Animator2(ASSET_MANAGER.getAsset("./Sprites/stick.png"), 0, 0,0,0,1,1);
        this.dir = -1;
        
    }

    //needs to get y displacement
    //needs to take power in to account
    shoot() {
        this.sum = (Math.abs((this.game.click.y - this.ball.y))+Math.abs((this.game.click.x - this.ball.x)));
        this.displacementx = Math.abs(((this.ball.x - 800) - this.center.x))
        this.displacementy = Math.abs(((this.ball.y + 20) - this.center.y))
        this.displacement = Math.sqrt(Math.pow(this.displacementx,2) + Math.pow(this.displacementy,2));
        this.xspeed = (this.game.click.x - this.ball.x)/this.sum * (this.game.power/20 + 1);
        this.yspeed = (this.game.click.y - this.ball.y)/this.sum * (this.game.power/20 + 1);
        

        if(this.displacement - this.game.power >= 60){
            this.dir = 1;
        }
        if(this.dir == 1 && this.displacement < 2){
            this.game.isballhit = true;
            this.game.power = 0;
            this.game.click = null;
            this.animator = this.temp;
            //console.log(this.sum);
        }else if(!this.game.isballhit && this.dir == -1 ){
            let angl = Math.atan2((this.game.click.y - this.ball.y),(this.game.click.x - this.ball.x));
            this.ball.velocity.speedX = 10 * (this.game.power/20 + 1) * Math.cos(angl);
            this.ball.velocity.speedY = 10 * (this.game.power/20 + 1) * Math.sin(angl);
            this.center.x -= this.xspeed;
            this.center.y -= this.yspeed;
            //console.log(this.xspeed);
        }else if(!this.game.isballhit && this.dir == 1 ){
            this.center.x += this.xspeed;
            this.center.y += this.yspeed;
        }
    }

    updateLocation(){
        this.center = {x: this.ball.x - 800, y: this.ball.y + 20};
        this.animator = new Animator2(ASSET_MANAGER.getAsset("./Sprites/stick.png"), 0, 0,820,26,1,1);
        this.dir = -1;
    }

    update() {
        if(this.ball.stopped){
            this.updateLocation();
            this.ball.stopped = false;
        }

        if(this.game.keys["w"]){
            if(this.game.power < 120)this.game.power += 1;
        }
        if(this.game.click != null ){
            this.shoot();
        }else if(this.game.mouse != null && !this.ball.stopped){
            this.angle = Math.atan2((this.game.mouse.y - this.ball.y),(this.game.mouse.x - this.ball.x));
        }


    }

    draw(ctx) {   
        this.animator.drawFrame(this.game.clockTick, ctx, this.center.x, this.center.y, this.angle); 
        ctx.font = "30px Arial";
        ctx.fillText("Power", 70, 70);
        ctx.fillText(this.game.power/12 + 1, 100, 100);
        if(this.game.click != null ){
            ctx.fillText(this.game.click.x, 100, 130);
        }
    }
}