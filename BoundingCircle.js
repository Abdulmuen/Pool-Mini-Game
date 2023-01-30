class BoundingCircle {
    constructor(x, y, radius) {
        Object.assign(this, { x, y, radius});

    };

    collide(oth) {
        let dx = this.x - oth.x;
        let dy = this.y - oth.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if(distance <= this.radius + oth.radius)return true;
        return false;
    };
};