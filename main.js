const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./Sprites/table.png");
ASSET_MANAGER.queueDownload("./Sprites/re.png");
ASSET_MANAGER.queueDownload("./Sprites/stick.png");
ASSET_MANAGER.queueDownload("./Sprites/white ball.png");



ASSET_MANAGER.downloadAll(() => {
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	
	
	

	gameEngine.init(ctx);
	

	

	
	gameEngine.start();
	gameEngine.addEntity(new SceneManager(gameEngine));


	
	
	
	
});
