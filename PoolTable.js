class PoolTable {
    constructor(game) {
        this.game = game;
        this.pocket1 = {x:95,y:90,radius:33}
        this.pocket2 = {x:95,y:760,radius:33}
        this.pocket3 = {x:770,y:780,radius:33}
        this.pocket4 = {x:1445,y:760,radius:33}
        this.pocket5 = {x:1445,y:90,radius:33}
        this.pocket6 = {x:770,y:70,radius:33}
        this.pockets = [this.pocket1,this.pocket2,this.pocket3,this.pocket4,this.pocket5,this.pocket6]


        this.Redscore = 0;
        this.Yellowscore = 0;
        

    }

    update() {
        if(this.Redscore == 5 || this.Yellowscore == 5){
            this.game.gameWon = true;
            this.game.gameOver = true;
        }
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Ball){
                that.pockets.forEach(pocket => {
                    if(entity.BC.collide(pocket)){
                        if(entity.color != "White") {
                            if(entity.color == 'Red') {
                                that.Redscore += 1;
                            } else if(entity.color == 'Yellow') {
                                that.Yellowscore += 1;
                            }
                            //TODO ball disapearing animation
                            ASSET_MANAGER.playAsset("./sounds/pocket.mp3");
                            entity.removeFromWorld = true;
                           
                        }
                        if(entity.color == "White") {
                            //game over
                            that.game.gameOver = true;
                            //restart the game

                        }

                    }
                });
            }

        });


    }

    draw(ctx) {
        ctx.strokeStyle = 'Red';
        
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/table.png"),0,0);
        ctx.fillStyle = "Yellow";
        ctx.font = "30px Arial";
        ctx.fillText("=>", 995, 45);
        ctx.fillText(this.Yellowscore, 1040, 45);
        ctx.beginPath();
        ctx.strokeStyle = "Yellow";
        ctx.arc(960, 35, 15,0,2*Math.PI, false);
        ctx.lineWidth = 3;
        ctx.fillStyle = 'lightgrey';
        ctx.fill()
        ctx.stroke();
        
        ctx.fillStyle = "Red";
        ctx.font = "30px Arial";
        ctx.fillText("=>", 1155, 45);
        ctx.fillText(this.Redscore, 1200, 45);
        ctx.beginPath();
        ctx.strokeStyle = "Red";
        ctx.arc(1120, 35, 15,0,2*Math.PI, false);
        ctx.lineWidth = 3;
        ctx.fillStyle = 'lightgrey';
        ctx.fill()
        ctx.stroke();
/*
        //pocketed animation
        if(this.pocketed){
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.col;
            let r = 2000;
            if ( r > 0) {
                ctx.save();
                ctx.globalCompositeOperation = "destination-out";
                ctx.beginPath();
                ctx.fillStyle = 'gray';
                ctx.arc(this._pocket.x + 20,this._pocket.y + 20,r/100,0, 2 * Math.PI)
                ctx.fill()
                ctx.stroke();
                ctx.restore();
                r -= this.game.clockTick;
                
            }
            this.pocketed = false;
        }
*/
        
/*
        //ctx.strokeRect(80, 80, 1333, 652);
        ctx.strokeRect(0, 125, 80, 560);
        ctx.strokeRect(1417.5, 125, 80, 560);
        ctx.strokeRect(130, 0, 560, 80);
        ctx.strokeRect(807.5, 0, 560, 80);
        ctx.strokeRect(130, 735, 560, 80);
        ctx.strokeRect(807.5, 735, 560, 80);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "yellow";
        ctx.arc(750,50,33,0, 2 * Math.PI)
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(75,70,33,0, 2 * Math.PI)
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(75,740,33,0, 2 * Math.PI)
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(750,760,33,0, 2 * Math.PI)
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(1425,740,33,0, 2 * Math.PI)
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(1425,70,33,0, 2 * Math.PI)
        ctx.stroke();
*/
        
    }
}