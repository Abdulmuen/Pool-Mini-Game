class Ball {
    constructor(game) {
        this.game = game;
        this.x = 500;
        this.y = 300;
        this.radius = 20
        this.direction = new Direction(this.x,this.y,this.x,this.y)

        //this.speed = 10;
        this.acceleration = 0.99;
        this.velocity = {speedX : 0, speedY : 0};
        this.stopped = true;
        this.xx = 1;
        this.yy = 1;

        this.BC = new BoundingCircle(this.x, this.y, this.radius);
    }

    collide(ball){

    }



    update() {
        this.BC = new BoundingCircle(this.x, this.y, this.radius);

        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BC && that.BC.collide(entity.BC)) {
                if (entity instanceof Ball) {
                    //this.collide(entity);

                }
            };
        });

        //ctx.strokeRect(62, 62, 1070, 528);
        if(this.x <= 62 || this.x >= 1070){this.xx *= -1;}
        if(this.y <= 62 ||this.y >= 528){this.yy *= -1;}

        if(this.game.isballhit){
            this.x += ((this.velocity.speedX *= this.acceleration) * this.xx);
            this.y += ((this.velocity.speedY *= this.acceleration) * this.yy);
        }
        

        if(this.velocity.speedX < 0.1 && this.velocity.speedY < 0.1){
            this.velocity = {speedX: 0,speedY: 0};
            this.stopped = true;
            this.game.isballhit = false;
        }


    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'Red';
        ctx.arc(this.x + 20, this.y + 20, this.radius,0,2*Math.PI, false);
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/white ball.png"),this.x,this.y);
    }
}