class PoolTable {
    constructor() {

    }

    update() {

    }

    draw(ctx) {
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(62, 62, 1070, 528);
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/table.png"),0,0);
        
    }
}