class TransitionScreen {
    constructor(game, prompt) {
        Object.assign(this, { game, prompt });

        this.elapsed = 0;
    };

    update() {
        if(this.game.keys["d"]){
            this.game.addEntity(new SceneManager(gameEngine));
            this.game.gameWon = false;
        }
    };

    draw(ctx) {
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
        ctx.fillStyle = "White";
        if (this.game.gameOver) {
            ctx.fillText(this.prompt, 13 * PARAMS.BLOCKWIDTH, 9 * PARAMS.BLOCKWIDTH);
            ctx.fillText("Press d to restart", 12.5 * PARAMS.BLOCKWIDTH, 12 * PARAMS.BLOCKWIDTH);
        }
        else {
        }
    };

};