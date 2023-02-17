class Ball {
    constructor(game,x,y,color) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.color = color;
        this.dx = x;
        this.dy = y;
        this.power = 0;
        
        this.radius = 20

        this.velocity = {vX : 0, vY : 0};//x and y components of speed
        this.moving = false;
        this.xdir = 1;
        this.ydir = 1;

        this.BC = new BoundingCircle(this,this.x, this.y, this.radius);

        //this.flag = true;
        this.inCol = true;


    }

    update_velocity(){
        this.nx = Math.abs(this.dx - this.x)/(Math.abs(this.dx - this.x) + Math.abs(this.dy - this.y));
        this.ny = Math.abs(this.dy - this.y)/(Math.abs(this.dx - this.x) + Math.abs(this.dy - this.y));
        this.velocity = {vX : this.power * this.nx, vY : this.power * this.ny};
        if(this.dx - this.x < 0) this.xdir *= -1;
        if(this.dy - this.y < 0) this.ydir *= -1;
        console.log(this.velocity);
    }
    col(entity){
        

        //console.log(entity.velocity.vX * this.xdir);
        //console.log(this.xdir);

        this.inCol = false;
        this.BC.collision(this, entity);
        this.inCol = true;


        

        //if(new_velocity.new_v1.x < 0)this.xdir *= -1;
        //if(new_velocity.new_v1.y < 0)this.ydir *= -1;
        //if(new_velocity.new_v2.x < 0)entity.xdir *= -1;
        //if(new_velocity.new_v2.y < 0)entity.ydir *= -1;
        //this.velocity = {vX: Math.abs(new_velocity.new_v1.x),vY: Math.abs(new_velocity.new_v1.y)};
        //entity.velocity = {vX:Math.abs(new_velocity.new_v2.x), vY: Math.abs(new_velocity.new_v2.y)};

        //console.log(this.xdir);
        //console.log("--------- " + this.temp);

    }

    update() {
        this.BC = new BoundingCircle(this,this.x, this.y, this.radius);
        const TICK = this.game.clockTick;
        if(this.temp == "white"){
            //console.log(this.velocity);
        }
        if(!this.stopped){
            this.velocity = {vX : this.velocity.vX *= 0.99, vY : this.velocity.vY *= 0.99};
            if(this.velocity.vX < 0.05 && this.velocity.vY < 0.05) {
                this.velocity = {vX : 0, vY : 0};
            }
    
            if(this.x <= 80 || this.x >= 1370){this.xdir *= -1;}
            if(this.y <= 80 ||this.y >= 690){this.ydir *= -1;}
            this.x += this.velocity.vX * TICK * this.xdir;
            this.y += this.velocity.vY * TICK * this.ydir;

        }


        this.BC = new BoundingCircle(this,this.x, this.y, this.radius);

        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BC && that.BC.collide(entity.BC) & entity !== that) {
                if (entity instanceof Ball && that.inCol) {
                    entity.stopped = false;
                    that.col(entity);

                }

            };

        });

        

        // //ctx.strokeRect(62, 62, 1070, 528);
         

        // if(this.game.isballhit){
        //     this.x += ((this.velocity.speedX *= this.acceleration) * this.xx);
        //     this.y += ((this.velocity.speedY *= this.acceleration) * this.yy);
        // }
        

        if(this.moving && this.velocity.vX < 1 && this.velocity.vY < 1){
            this.velocity = {vX: 0,vY: 0};
            this.moving = false;
            this.xdir = 1;
            this.ydir = 1;
        }


    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x + 20, this.y + 20, this.radius,0,2*Math.PI, false);
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/white ball.png"),this.x,this.y);
    }
}
