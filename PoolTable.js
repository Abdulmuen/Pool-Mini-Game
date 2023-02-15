class PoolTable {
    constructor(game) {
        this.game = game;
        this.pocket1 = {x:40,y:40,radius:80}
        this.pocket2 = {x:1450,y:40,radius:80}
        this.pocket3 = {x:1450,y:770,radius:80}
        this.pocket4 = {x:40,y:770,radius:80}
        this.pocket5 = {x:750,y:0,radius:80}
        this.pocket6 = {x:750,y:800,radius:80}
        this.pockets = [this.pocket1,this.pocket2,this.pocket3,this.pocket4,this.pocket5,this.pocket6]
        this.Redscore = 0;
        this.Bluescore = 0;
        

    }

    update() {
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Ball){
                that.pockets.forEach(pocket => {
                    if(entity.BC.collide(pocket)){
                        if(entity.color != "White") {
                            if(entity.color == "Red") that.Redscore += 1;
                            if(entity.color == "Blue") that.Bluescore += 1;
                            that.game.removeEntity(entity);
                        }
                    }
                });
            }

        });


    }

    draw(ctx) {
        ctx.strokeStyle = 'Red';
        
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/table.png"),0,0);
        ctx.font = "30px Arial";
        ctx.fillText("Blue :", 1000, 80);
        ctx.fillText(this.Bluescore, 1080, 80);
        ctx.fillText("Red :", 1120, 80);
        ctx.fillText(this.Redscore, 1180, 80);

        //ctx.strokeRect(80, 80, 1333, 652);
        //ctx.beginPath();
        
        //ctx.arc(750,0,80,0, 2 * Math.PI)
        //ctx.lineWidth = 1;
        //ctx.strokeStyle = "black";
        //ctx.stroke();
        
    }
}