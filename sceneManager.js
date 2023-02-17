class SceneManager {
    constructor(game) {
        this.game = game;
        this.sm = this;
        this.game.gameOver = false;
        this.loadGame();
        this.game.entities.forEach(function (entity) {
            if(entity instanceof TransitionScreen)
                    entity.removeFromWorld = true;
        });
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadGame(){
        if(!this.game.gameOver){
            let white_ball = new Ball(this.game,410,400, 'White');
            this.game.addEntity(white_ball);
            this.game.addEntity(new Stick(this.game, white_ball));
            this.game.addEntity(new Ball(this.game,1020,400,'Red'));
            this.game.addEntity(new Ball(this.game,1060,370,'Yellow'));
            this.game.addEntity(new Ball(this.game,1060,430,'Red'));
            this.game.addEntity(new Ball(this.game,1100,400,'Yellow'));
            this.game.addEntity(new Ball(this.game,1100,340,'Red'));
            this.game.addEntity(new Ball(this.game,1100,460,'Red'));
            this.game.addEntity(new Ball(this.game,1140,370,'Yellow'));
            this.game.addEntity(new Ball(this.game,1140,430,'Red'));
            this.game.addEntity(new Ball(this.game,1140,310,'Yellow'));
            this.game.addEntity(new Ball(this.game,1140,490,'Yellow'));
            this.game.addEntity(new PoolTable(this.game));
        }else{
            if(this.game.gameWon){
                this.game.addEntity(new TransitionScreen(this.game, "You Won :)"));
            }else
                this.game.addEntity(new TransitionScreen(this.game, "You Lost :("));
            
        }

    }

    update() {
        if(this.game.gameOver){
            this.clearEntities();
            this.loadGame();
        }
    
    }

    draw(ctx) {
        
    
    }
}