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
/*
class physics {
    constructor(ball){
        this.x1 = this.x;
        this.x2 = ball.x;
        this.y1 = this.y;
        this.y2 = ball.y;
        this.v1 = this.velocity;
        this.v2 = ball.velocity;
        this.new_velocities = this.updated_Velocities();

    }

    unit_normal(){
        return {x:this.x2-this.x1,y:this.y2-this.y1};
    }
    ditance(){
        return Math.sqrt((this.unit_normal().x * this.unit_normal().x) + (this.unit_normal().y * this.unit_normal().y));
    }
    unit_vector(){
        return {x:this.unit_normal().x/this.ditance,y:this.unit_normal().y/this.ditance};
    }
    unit_tangent(){
        return {x:-this.unit_normal().y,y:this.unit_normal().x};
    }
    dot_product(p1, p2){
        return p1.x * p2.x + p1.y * p2.y;
    }
    product(p1, p2){
        return {a:p1.x * p2.x, b: p1.y * p2.y};
    }
    add(p1, p2){
        return {a:p1.x + p2.x, b: p1.y + p2.y};
    }

    normal_components(){
        return {vn1: this.dot_product(this.unit_normal(),this.v1),vn2: this.dot_product(this.unit_normal(),this.v2)};
    }
    tangent_components(){
        return {vt1: this.dot_product(this.unit_tangent(),this.v1),vt2: this.dot_product(this.unit_tangent(),this.v2)};
    }
    normal_v(){
        return {normal1 : this.product(this.unit_normal(),{x:this.normal_components().vn2,y:this.normal_components().vn2}), 
        normal2 : this.product(this.unit_normal(),{x:this.normal_components().vn1,y:this.normal_components().vn1})};
    }
    tangent_v(){
        return {tangent1: this.product(this.unit_normal(),{x:this.normal_v().normal1,y:this.normal_v().normal1}),
                tangent2: this.product(this.unit_normal(),{x:this.normal_v().normal2,y:this.normal_v().normal2})};
    }
    updated_Velocities(){
        return{new_v1:this.add(this.normal_v().normal1,this.tangent_v().tangent1),
            new_v2:this.add(this.normal_v().normal2,this.tangent_v().tangent2)};
    }

}
*/