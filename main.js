const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./Sprites/table.png");
ASSET_MANAGER.queueDownload("./Sprites/re.png");
ASSET_MANAGER.queueDownload("./Sprites/stick.png");
ASSET_MANAGER.queueDownload("./Sprites/white ball.png");



ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	let ball = new CueBall(gameEngine);
	gameEngine.addEntity(ball);
	gameEngine.addEntity(new Stick(gameEngine, ball));
	gameEngine.addEntity(new PoolTable());
	
	// gameEngine.addEntity(new CueBall3(gameEngine));
	// gameEngine.addEntity(new CueBall2(gameEngine));
	
	
	

	gameEngine.init(ctx);

	
	gameEngine.start();


	
	
	
	
});
