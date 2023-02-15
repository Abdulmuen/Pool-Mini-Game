class BoundingCircle {
    constructor(ball1, x, y, radius) {
        Object.assign(this, {ball1, x, y, radius});

    };

    collide(oth) {
        let dx = this.x - oth.x;
        let dy = this.y - oth.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < this.radius + oth.radius + 2){
            return true;
        }
        return false;
    };
    dot_product(p1, p2){
        return p1.x * p2.x + p1.y * p2.y;
    }
    product(p1, p2){
        return {x:p1.x * p2.x, y: p1.y * p2.y};
    }
    add(p1, p2){
        return {x:p1.x + p2.x, y: p1.y + p2.y};
    }

    //steps from https://imada.sdu.dk/u/rolf/Edu/DM842/E14/2dcollisions.pdf
    collision(ball, ball2) {
        
        this.x1 = ball.x;
        this.x2 = ball2.x;
        this.y1 = ball.y;
        this.y2 = ball2.y;
        this.d1 = ball.velocity.vX * ball.xdir;
        this.d2 = ball.velocity.vY * ball.ydir;
        this.v1 = {x:this.d1, y: this.d2};
        this.d1 = ball2.velocity.vX * ball2.xdir;
        this.d2 = ball2.velocity.vY * ball2.ydir;
        this.v2 = {x:this.d1, y: this.d2};
        
        
        this.normal = {x:this.x2-this.x1,y:this.y2-this.y1};
        
        this.ditance = Math.sqrt((this.normal.x * this.normal.x) + (this.normal.y * this.normal.y));

        let s = (20-this.ditance)/this.ditance;

        const minimum_distance = this.product(this.normal,{x:s,y:s});
 
        this.unit_normal = {x:this.normal.x/this.ditance,y:this.normal.y/this.ditance};
        
        this.unit_tangent = {x:-this.unit_normal.y,y:this.unit_normal.x};

        this.normal_components = {vn1: this.dot_product(this.unit_normal,this.v1),vn2: this.dot_product(this.unit_normal,this.v2)};
        
        this.tangent_components = {vt1: this.dot_product(this.unit_tangent,this.v1),vt2: this.dot_product(this.unit_tangent,this.v2)};
        
        this.normal_v = {normal1 : this.product(this.unit_normal,{x:this.normal_components.vn2,y:this.normal_components.vn2}), 
        normal2 : this.product(this.unit_normal,{x:this.normal_components.vn1,y:this.normal_components.vn1})};

        let a = {x:this.tangent_components.vt1,y:this.tangent_components.vt1};
        let b = {x:this.tangent_components.vt2,y:this.tangent_components.vt2}
        
        this.tangent_v = {tangent1:this.product(this.unit_tangent,a), tangent2:this.product(this.unit_tangent,b)};
        
        //new velocities with respect to the canvas coordinate
        this.new_velocities = {new_v1:this.add(this.normal_v.normal1,this.tangent_v.tangent1),
            new_v2:this.add(this.normal_v.normal2,this.tangent_v.tangent2), min_d: minimum_distance};
        

        //swap velocity (speed and direction separately)
        ball.velocity.vX = Math.abs(this.new_velocities.new_v1.x);
        ball.velocity.vY = Math.abs(this.new_velocities.new_v1.y);
        this.new_d1x = this.new_velocities.new_v1.x < 0 ? -1: 1;
        ball.xdir = this.new_d1x;
        this.new_d1y = this.new_velocities.new_v1.y < 0 ? -1: 1;
        ball.ydir = this.new_d1y;
        ball2.velocity.vX = Math.abs(this.new_velocities.new_v2.x);
        ball2.velocity.vY = Math.abs(this.new_velocities.new_v2.y);
        this.new_d2x = this.new_velocities.new_v2.x < 0 ? -1: 1;
        ball2.xdir = this.new_d2x;
        this.new_d2y = this.new_velocities.new_v2.y < 0 ? -1: 1;
        ball2.ydir = this.new_d2y;

        // this.tt = ((40- this.ditance)/this.ditance)/2;

        // const md = this.product(this.normal,{x:this.tt,y:this.tt})

        // ball.x += md.x;
        // ball.y += md.y;
        // ball2.x -= md.x;
        // ball2.y -= md.y;



        return this.new_velocities;
    }


};