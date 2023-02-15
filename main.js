const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./Sprites/table.png");
ASSET_MANAGER.queueDownload("./Sprites/re.png");
ASSET_MANAGER.queueDownload("./Sprites/stick.png");
ASSET_MANAGER.queueDownload("./Sprites/white ball.png");



ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	let white_ball = new Ball(gameEngine,390,380, 'White');
	gameEngine.addEntity(white_ball);
	gameEngine.addEntity(new Ball(gameEngine,1000,380,'Red'));
	gameEngine.addEntity(new Ball(gameEngine,1040,350,'Blue'));
	gameEngine.addEntity(new Ball(gameEngine,1040,410,'Red'));
	gameEngine.addEntity(new Ball(gameEngine,1080,380,'Blue'));
	gameEngine.addEntity(new Ball(gameEngine,1080,320,'Red'));
	gameEngine.addEntity(new Ball(gameEngine,1080,440,'Red'));
	gameEngine.addEntity(new Ball(gameEngine,1120,350,'Blue'));
	gameEngine.addEntity(new Ball(gameEngine,1120,410,'Red'));
	gameEngine.addEntity(new Ball(gameEngine,1120,290,'Blue'));
	gameEngine.addEntity(new Ball(gameEngine,1120,470,'Blue'));
	gameEngine.addEntity(new Stick(gameEngine, white_ball));
	gameEngine.addEntity(new PoolTable(gameEngine));
	
	// gameEngine.addEntity(new CueBall3(gameEngine));
	// gameEngine.addEntity(new CueBall2(gameEngine));
	
	
	

	gameEngine.init(ctx);

	
	gameEngine.start();


	
	
	
	
});
