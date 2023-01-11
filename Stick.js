class Stick {
    constructor(game, ball) {
        this.game = game;
        this.ball = ball;
        this.center = {x: ball.origion.x - 820, y: ball.origion.y};
        this.angle = 0;
        this.animator = new Animator2(ASSET_MANAGER.getAsset("./Sprites/stick.png"), 0, 0,820,26,1,1);
        this.dir = -1;
        
    }

    //needs to get y displacement
    //needs to take power in to account
    shoot() {
        this.sum = (Math.abs((this.game.click.y - this.ball.origion.y))+Math.abs((this.game.click.x - this.ball.origion.x)));
        this.displacementx = Math.abs(((this.ball.origion.x - 820) - this.center.x))
        this.displacementy = Math.abs(((this.ball.origion.y) - this.center.y))
        this.displacement = Math.sqrt(Math.pow(this.displacementx,2) + Math.pow(this.displacementy,2));
        this.xspeed = (this.game.click.x - this.ball.origion.x)/this.sum;
        this.yspeed = (this.game.click.y - this.ball.origion.y)/this.sum;

        if(this.displacement - this.game.power >= 60){
            this.dir = 1;
        }
        if(this.dir == 1 && this.displacement < 2){
            this.game.isballhit = true;
            this.game.power = 0;
        }else if(!this.game.isballhit && this.dir == -1 ){
            this.center.x -= this.xspeed;
            this.center.y -= this.yspeed;
        }else if(!this.game.isballhit && this.dir == 1 ){
            this.center.x += this.xspeed;
            this.center.y += this.yspeed;
        }
    }

    update() {

        if(this.game.keys["w"]){
            if(this.game.power < 120)this.game.power += 1;
        }
        if(this.game.click != null ){
            this.shoot();
            
            
        }else if(this.game.mouse != null){
            this.angle = Math.atan2((this.game.mouse.y - this.ball.origion.y),(this.game.mouse.x - this.ball.origion.x));
        }

    }

    draw(ctx) {   
        this.animator.drawFrame(this.game.clockTick, ctx, this.center.x, this.center.y, this.angle);  
    }
}